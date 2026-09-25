const fs = require('fs');
const path = require('path');

const write = (p, content) => {
  const full = path.join(__dirname, p);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content.trim() + '\\n');
};

// ==========================================
// FEATURES - RECOVERY
// ==========================================
write('src/features/recovery/schemas.ts', `
import { z } from 'zod';

export const recoveryRequestSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  reason: z.string().min(5, 'Reason for recovery is required')
});

export type RecoveryRequestInput = z.infer<typeof recoveryRequestSchema>;
`);

write('src/features/recovery/actions.ts', `
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
`);

// ==========================================
// FEATURES - REPORTS & EXPORTS
// ==========================================
write('src/features/reports/actions.ts', `
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
}
`);

write('src/features/exports/actions.ts', `
'use server';

import { requireAuth } from '@/lib/database/auth-queries';
import { logAudit } from '@/features/audit/actions';

export async function exportToCsv(data: any[], filename: string) {
  await requireAuth();
  
  const headers = Object.keys(data[0] || {}).join(',');
  const rows = data.map(row => Object.values(row).map(val => \`"\${val}"\`).join(','));
  const csv = [headers, ...rows].join('\\n');

  await logAudit({ action: 'CSV_EXPORT', entity_type: 'REPORT' });
  return csv;
}
`);

// ==========================================
// LIB / UTILS
// ==========================================
write('src/lib/logging/index.ts', `
export function logInfo(message: string, meta?: any) {
  console.log(JSON.stringify({ level: 'INFO', timestamp: new Date(), message, meta }));
}

export function logError(message: string, error?: any) {
  console.error(JSON.stringify({ level: 'ERROR', timestamp: new Date(), message, error }));
}
`);

write('src/lib/storage/index.ts', `
import { createClient } from '@/lib/supabase/server';

export async function uploadEvidence(file: File, caseId: string) {
  const supabase = createClient();
  const path = \`evidence/\${caseId}/\${Date.now()}_\${file.name}\`;
  
  const { data, error } = await supabase.storage.from('secure_attachments').upload(path, file);
  if (error) throw error;
  
  return data.path;
}
`);

write('src/lib/security/rate-limit.ts', `
// Basic in-memory rate limiter for server actions (would use Redis in production)
const rateLimits = new Map<string, { count: number, resetTime: number }>();

export function checkRateLimit(ip: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const record = rateLimits.get(ip);
  
  if (!record || now > record.resetTime) {
    rateLimits.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }
  
  if (record.count >= limit) {
    return false;
  }
  
  record.count++;
  return true;
}
`);

write('src/lib/imports/parser.ts', `
export function parseCSV(content: string) {
  const lines = content.split('\\n').map(l => l.trim()).filter(Boolean);
  if (lines.length < 2) return [];
  
  const headers = lines[0].split(',').map(h => h.trim());
  return lines.slice(1).map(line => {
    const values = line.split(',');
    return headers.reduce((obj, header, i) => {
      obj[header] = values[i]?.trim();
      return obj;
    }, {} as any);
  });
}
`);

// ==========================================
// HOOKS
// ==========================================
write('src/hooks/use-debounce.ts', `
import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}
`);

write('src/hooks/use-toast.ts', `
import { useState } from 'react';

export function useToast() {
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  return { toast, showToast };
}
`);

// ==========================================
// MIDDLEWARE (Logic reusable modules, requested architecture)
// ==========================================
write('src/middleware/auth-check.ts', `
import { UserSession } from '@/types/auth.types';

export function hasPermission(user: UserSession, requiredRole: string) {
  if (user.role === 'POLICE_SUPER_ADMIN') return true;
  return user.role === requiredRole;
}
`);

console.log('Populated empty logic folders.');
