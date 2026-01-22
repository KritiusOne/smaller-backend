import { z } from 'zod';

export const SignUpSchema = z.object({
  email: z.email('Email invalido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  displayName: z.string().optional(),
});
export const VerifyTokenSchema = z.object({
  token: z.string().min(1, 'Token es requerido'),
});

export type SignUpInput = z.infer<typeof SignUpSchema>;
export type VerifyTokenInput = z.infer<typeof VerifyTokenSchema>;
