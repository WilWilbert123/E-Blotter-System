import { z } from 'zod';

export const transferSchema = z.object({
  person_id: z.string().uuid(),
  to_barangay_id: z.string().uuid(),
  reason: z.string().min(5),
});

export type TransferInput = z.infer<typeof transferSchema>;\n