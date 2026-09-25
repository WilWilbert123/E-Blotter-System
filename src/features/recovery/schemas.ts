import { z } from 'zod';

export const recoveryRequestSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  reason: z.string().min(5, 'Reason for recovery is required')
});

export type RecoveryRequestInput = z.infer<typeof recoveryRequestSchema>;\n