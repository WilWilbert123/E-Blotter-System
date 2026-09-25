'use server';

import { getDb } from '@/lib/database';
import { requireAuth } from '@/lib/database/auth-queries';
import { logAudit } from '@/features/audit/actions';

export async function requestRecovery(username: string, reason: string) {
  const db = getDb();
  
  // Find user by username
  const { data: user } = await db.from('user_profiles').select('id').eq('username', username).single();
  if (!user) return { error: 'User not found' }; // Avoid user enumeration in a real app, but for this context we allow it

  const { error } = await db.from('account_recovery').insert({
    user_id: user.id,
    status: 'PENDING',
    expires_at: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString() // 24 hours
  });

  if (error) return { error: error.message };

  await logAudit({
    action: 'RECOVERY_REQUEST',
    entity_type: 'USER',
    entity_id: user.id,
    new_data: { reason }
  });

  return { success: true };
}
