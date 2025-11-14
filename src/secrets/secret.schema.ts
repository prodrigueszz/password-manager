import { z } from "zod";

export const secretSchema = z.object({
  id: z.uuid(),
  site: z
    .string({ error: "Este campo deve ser uma string" })
    .min(3, { error: "Este campo deve ter no mínimo 3 caracteres" })
    .max(30, { error: "Este campo deve ter no máximo 30 caracteres" }),
  login_identifier: z
    .string({ error: "Este campo deve ser uma string" })
    .min(3, { error: "Este campo deve ter no mínimo 3 caractetes" })
    .max(30, { error: "Este campo deve ter no máximo 30 caracteres" }),
  password: z
    .string({ error: "Este campo deve ser uma string" })
    .min(8, { error: "Este campo deve conter no mínimo" })
    .max(20, { error: "Este campo deve ter no máximo 20 catacteres" }),
  owner_id: z.uuid({ error: "Este campo deve ser um uuid" }),
});

export const getSecretSchema = z.object({
  body: z
    .object({
      site: z
        .string({ error: "Este campo deve ser uma string" })
        .min(3, { error: "Este campo deve ter no mínimo 3 caracteres" })
        .max(30, { error: "Este campo deve ter no máximo 30 caracteres" }),
    })
    .optional(),
  params: z.object({
    id: z.uuid(),
  }),
});

export const deleteSecretSchema = z.object({
  params: z.object({
    id: z.uuid(),
  }),
  body: z.object({
    id: z.uuid()
  })
});

export const updateSecretSchema = z.object({
  params: z.object({
    id: z.uuid(),
  }),
  body: z.object({
    id: z.uuid(),
    login_identifier: z
      .string({ error: "Este campo deve ser uma string" })
      .min(3, { error: "Este campo deve ter no mínimo 3 caractetes" })
      .max(30, { error: "Este campo deve ter no máximo 30 caracteres" })
      .optional(),
    password: z
      .string({ error: "Este campo deve ser uma string" })
      .min(8, { error: "Este campo deve conter no mínimo" })
      .max(20, { error: "Este campo deve ter no máximo 20 catacteres" })
      .optional(),
  }),
});
