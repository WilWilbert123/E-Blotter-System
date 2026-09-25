const fs = require('fs');
const path = require('path');

const write = (p, content) => {
  const full = path.join(__dirname, p);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content.trim() + '\\n');
};

// ==========================================
// FEATURES - BARANGAYS
// ==========================================
write('src/features/barangays/schemas.ts', `
import { z } from 'zod';

export const barangaySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  official_display_name: z.string().min(1, 'Official display name is required'),
  captain_name: z.string().optional(),
  address: z.string().optional(),
  contact_details: z.string().optional(),
  logo_url: z.string().optional(),
});

export type BarangayInput = z.infer<typeof barangaySchema>;
`);

write('src/features/barangays/actions.ts', `
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
`);

// ==========================================
// FEATURES - BLOTTER
// ==========================================
write('src/features/blotter/schemas.ts', `
import { z } from 'zod';

export const blotterSchema = z.object({
  case_number: z.string().min(1),
  incident_type: z.enum([
    'THEFT', 'PHYSICAL_INJURY', 'THREATS', 'TRESPASSING', 
    'MALICIOUS_MISCHIEF', 'SLANDER', 'DOMESTIC_VIOLENCE', 
    'PROPERTY_DISPUTE', 'OTHER'
  ]),
  incident_date: z.string().datetime(),
  location: z.string().min(1),
  narrative: z.string().min(1),
  remarks: z.string().optional(),
});

export type BlotterInput = z.infer<typeof blotterSchema>;
`);

write('src/features/blotter/actions.ts', `
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
}
`);

// ==========================================
// FEATURES - PERSONS
// ==========================================
write('src/features/persons/schemas.ts', `
import { z } from 'zod';

export const personSchema = z.object({
  first_name: z.string().min(1),
  middle_name: z.string().optional(),
  last_name: z.string().min(1),
  sex: z.enum(['MALE', 'FEMALE', 'OTHER']).optional(),
  date_of_birth: z.string().optional(),
  contact_information: z.string().optional(),
});

export type PersonInput = z.infer<typeof personSchema>;
`);

// ==========================================
// LIB - UTILS
// ==========================================
write('src/lib/utils/index.ts', `
export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(amount);
}
export function formatDate(dateString: string) {
  return new Intl.DateTimeFormat('en-PH', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(dateString));
}
`);

write('src/lib/config/index.ts', `
export const APP_CONFIG = {
  appName: 'E-Blotter System',
  region: 'Irosin, Sorsogon',
  maxUploadSizeMb: 10,
  defaultPaginationLimit: 20
};
`);

console.log('Built core business logic features.');
