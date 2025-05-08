// lib/schemas.ts
import { z } from 'zod';

export const EmailSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export type EmailInput = z.infer<typeof EmailSchema>;
