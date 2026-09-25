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