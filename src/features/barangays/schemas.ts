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
