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
    success: true,
    entity_type: 'PERSON_TRANSFER',
    entity_id: newTransfer.id,
    new_data: newTransfer
  });

  return { success: true, transfer: newTransfer };
}
