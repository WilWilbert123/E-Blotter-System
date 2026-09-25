const fs = require('fs');
const path = require('path');

const write = (p, content) => {
  const full = path.join(__dirname, p);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content.trim() + '\\n');
};

// ==========================================
// FEATURES - AUDIT
// ==========================================
write('src/features/audit/schemas.ts', `
import { z } from 'zod';

export const auditSchema = z.object({
  action: z.string(),
  entity_type: z.string(),
  entity_id: z.string().uuid().optional(),
  old_data: z.any().optional(),
  new_data: z.any().optional(),
  success: z.boolean().default(true),
  failure_reason: z.string().optional()
});

export type AuditInput = z.infer<typeof auditSchema>;
`);

write('src/features/audit/actions.ts', `
'use server';

import { getDb } from '@/lib/database';
import { requireAuth } from '@/lib/database/auth-queries';
import { auditSchema, AuditInput } from './schemas';

export async function logAudit(data: AuditInput) {
  const user = await requireAuth();
  
  const parsed = auditSchema.safeParse(data);
  if (!parsed.success) return; // Silent fail for audit logs to not block main thread

  const db = getDb();
  await db.from('audit_logs').insert({
    ...parsed.data,
    actor_id: user.id,
    barangay_id: user.barangayId
  });
}

export async function getAuditLogs(limit = 50) {
  const user = await requireAuth(['POLICE_SUPER_ADMIN']);
  const db = getDb();
  
  const { data, error } = await db
    .from('audit_logs')
    .select('*, user_profiles(first_name, last_name, username)')
    .order('created_at', { ascending: false })
    .limit(limit);
    
  if (error) throw new Error(error.message);
  return data;
}
`);

// ==========================================
// FEATURES - USERS
// ==========================================
write('src/features/users/schemas.ts', `
import { z } from 'zod';

export const userCreateSchema = z.object({
  username: z.string().min(3),
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  role: z.enum(['POLICE_SUPER_ADMIN', 'POLICE_OFFICER', 'BARANGAY_CAPTAIN', 'BARANGAY_STAFF']),
  barangay_id: z.string().uuid().optional(),
  password: z.string().min(8)
});

export type UserCreateInput = z.infer<typeof userCreateSchema>;
`);

write('src/features/users/actions.ts', `
'use server';

import { getDb } from '@/lib/database';
import { requireAuth } from '@/lib/database/auth-queries';
import { userCreateSchema, UserCreateInput } from './schemas';
import { createAdminClient } from '@/lib/supabase/server';
import { logAudit } from '@/features/audit/actions';

export async function createUser(data: UserCreateInput) {
  const adminUser = await requireAuth(['POLICE_SUPER_ADMIN']);
  
  const parsed = userCreateSchema.safeParse(data);
  if (!parsed.success) return { error: 'Invalid input' };

  // Use service role client to create auth user
  const adminAuth = createAdminClient();
  const { data: authData, error: authError } = await adminAuth.auth.admin.createUser({
    email: \`\${parsed.data.username}@irosin.blotter.local\`,
    password: parsed.data.password,
    email_confirm: true
  });

  if (authError) return { error: authError.message };

  const db = getDb();
  
  // Get role id
  const { data: roleData } = await db.from('roles').select('id').eq('name', parsed.data.role).single();
  
  if (!roleData) return { error: 'Invalid role' };

  // Create profile
  const { error: profileError } = await db.from('user_profiles').insert({
    id: authData.user.id,
    role_id: roleData.id,
    username: parsed.data.username,
    first_name: parsed.data.first_name,
    last_name: parsed.data.last_name,
    must_change_password: true
  });

  if (profileError) {
    await adminAuth.auth.admin.deleteUser(authData.user.id);
    return { error: profileError.message };
  }

  // Link barangay if applicable
  if (parsed.data.barangay_id && parsed.data.role.startsWith('BARANGAY')) {
    await db.from('barangay_users').insert({
      user_id: authData.user.id,
      barangay_id: parsed.data.barangay_id
    });
  }

  await logAudit({
    action: 'CREATE',
    entity_type: 'USER',
    entity_id: authData.user.id,
    new_data: { username: parsed.data.username, role: parsed.data.role }
  });

  return { success: true };
}
`);

// ==========================================
// FEATURES - TRANSFERS
// ==========================================
write('src/features/transfers/schemas.ts', `
import { z } from 'zod';

export const transferSchema = z.object({
  person_id: z.string().uuid(),
  to_barangay_id: z.string().uuid(),
  reason: z.string().min(5),
});

export type TransferInput = z.infer<typeof transferSchema>;
`);

write('src/features/transfers/actions.ts', `
'use server';

import { getDb } from '@/lib/database';
import { requireAuth } from '@/lib/database/auth-queries';
import { transferSchema, TransferInput } from './schemas';
import { logAudit } from '@/features/audit/actions';

export async function initiateTransfer(data: TransferInput) {
  const user = await requireAuth(['BARANGAY_CAPTAIN', 'BARANGAY_STAFF']);
  
  const parsed = transferSchema.safeParse(data);
  if (!parsed.success) return { error: 'Invalid input' };

  if (!user.barangayId) return { error: 'No barangay context' };

  const db = getDb();
  
  const { data: newTransfer, error } = await db.from('person_transfers').insert({
    person_id: parsed.data.person_id,
    from_barangay_id: user.barangayId,
    to_barangay_id: parsed.data.to_barangay_id,
    reason: parsed.data.reason,
    initiated_by: user.id,
    status: 'PENDING'
  }).select().single();
  
  if (error) return { error: error.message };

  await logAudit({
    action: 'TRANSFER',
    entity_type: 'PERSON_TRANSFER',
    entity_id: newTransfer.id,
    new_data: newTransfer
  });

  return { success: true, transfer: newTransfer };
}
`);

console.log('Built remaining feature business logic layers.');
