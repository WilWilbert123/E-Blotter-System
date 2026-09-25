import { z } from 'zod';

export const auditSchema = z.object({
  action: z.string(),
  entity_type: z.string(),
  entity_id: z.string().uuid().optional(),
  old_data: z.any().optional(),
  new_data: z.any().optional(),
  success: z.boolean().default(true),
  failure_reason: z.string().optional()
});

export type AuditInput = z.infer<typeof auditSchema>;
