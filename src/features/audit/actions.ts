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
}\n