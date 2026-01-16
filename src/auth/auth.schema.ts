import { z } from 'zod';

export const loginSchema = z.object({
  email: z.email({ error: "Insira um email válido" }),
  password: z
  .string({ error: "Este campo deve ser uma string" })
  .min(8, { error: "Este campo deve ter no mínimo 8 caracteres" })
  .max(16, { error: "Este campo deve ter no máximo 16 caracters" })
})