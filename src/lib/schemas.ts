// lib/schemas.ts
import { z } from 'zod';

export const OrderSchema = z.object({
  vopsit: z.string().min(1),
  folosire: z.string().min(1),
  forma: z.string().min(1),
  calatorit: z.string().min(1),
  email: z.string().email('Email invalid'),
  telefon: z.string().min(10),
  cantitate: z.string().min(1),
});

export const EmailSchema = z.object({
  email: z.string().email('Email invalid'),
});

export type EmailMessageInput = z.infer<typeof EmailSchema>;
export type EmailInput = z.infer<typeof OrderSchema>;
