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
    email: `${parsed.data.username}@irosin.blotter.local`,
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
}\n