'use server';

import { getDb } from '@/lib/database';
import { requireAuth } from '@/lib/database/auth-queries';
import { blotterSchema, BlotterInput } from './schemas';

export async function createBlotter(data: BlotterInput) {
  const user = await requireAuth(['BARANGAY_CAPTAIN', 'BARANGAY_STAFF']);
  
  const parsed = blotterSchema.safeParse(data);
  if (!parsed.success) return { error: 'Invalid input' };

  if (!user.barangayId) return { error: 'No barangay associated with this user' };

  const db = getDb();
  const { error } = await db.from('blotter_cases').insert({
    ...parsed.data,
    barangay_id: user.barangayId,
    created_by: user.id,
    updated_by: user.id
  });
  
  if (error) return { error: error.message };
  return { success: true };
}\n