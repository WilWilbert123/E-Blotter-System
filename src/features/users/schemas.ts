import { z } from 'zod';

export const userCreateSchema = z.object({
  username: z.string().min(3),
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  role: z.enum(['POLICE_SUPER_ADMIN', 'POLICE_OFFICER', 'BARANGAY_CAPTAIN', 'BARANGAY_STAFF']),
  barangay_id: z.string().uuid().optional(),
  password: z.string().min(8)
});

export type UserCreateInput = z.infer<typeof userCreateSchema>;
