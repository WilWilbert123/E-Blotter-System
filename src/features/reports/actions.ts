'use server';

import { getDb } from '@/lib/database';
import { requireAuth } from '@/lib/database/auth-queries';

export async function generateBlotterReport(startDate: string, endDate: string) {
  const user = await requireAuth(['BARANGAY_CAPTAIN', 'BARANGAY_STAFF']);
  const db = getDb();

  const { data, error } = await db.from('blotter_cases')
    .select('*')
    .eq('barangay_id', user.barangayId)
    .gte('incident_date', startDate)
    .lte('incident_date', endDate);

  if (error) throw new Error(error.message);
  return data;
}\n