'use server';

import { getDb } from '@/lib/database';
import { requireAuth } from '@/lib/database/auth-queries';
import { barangaySchema, BarangayInput } from './schemas';

export async function createBarangay(data: BarangayInput) {
  await requireAuth(['POLICE_SUPER_ADMIN']);
  
  const parsed = barangaySchema.safeParse(data);
  if (!parsed.success) return { error: 'Invalid input' };

  const db = getDb();
  const { error } = await db.from('barangays').insert(parsed.data);
  
  if (error) return { error: error.message };
  return { success: true };
}

export async function getBarangays() {
  await requireAuth(['POLICE_SUPER_ADMIN', 'POLICE_OFFICER']);
  const db = getDb();
  const { data, error } = await db.from('barangays').select('*').order('name');
  
  if (error) throw new Error(error.message);
  return data;
}
