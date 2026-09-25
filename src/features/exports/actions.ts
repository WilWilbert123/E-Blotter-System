'use server';

import { requireAuth } from '@/lib/database/auth-queries';
import { logAudit } from '@/features/audit/actions';

export async function exportToCsv(data: any[], filename: string) {
  await requireAuth();
  
  const headers = Object.keys(data[0] || {}).join(',');
  const rows = data.map(row => Object.values(row).map(val => `"${val}"`).join(','));
  const csv = [headers, ...rows].join('\n');

  await logAudit({ action: 'CSV_EXPORT', entity_type: 'REPORT' });
  return csv;
}\n