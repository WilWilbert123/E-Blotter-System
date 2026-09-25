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
