import { z } from "zod";

export const secretSchema = z.object({
  id: z.uuid(),
  site: z
    .string({ error: "Este campo deve ser uma string" })
    .min(3, { error: "Este campo deve ter no mínimo 3 caracteres" })
    .max(30, { error: "Este campo deve ter no máximo 30 caracteres" }),
  loginIdentifier: z
    .string({ error: "Este campo deve ser uma string" })
    .min(3, { error: "Este campo deve ter no mínimo 3 caracteres" })
    .max(30, { error: "Este campo deve ter no máximo 30 caracteres" }),
  ciphertext: z.string({ error: "Este campo deve ser uma string" }),
  iv: z.string({ error: "Este campo deve ser uma string" }),
  authTag: z.string({ error: "Este campo deve ser uma string" }),
  ownerId: z.uuid({ error: "Este campo deve ser um uuid" }),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const getSecretSchema = z.object({
  body: z
    .object({
      site: z
        .string({ error: "Este campo deve ser uma string" })
        .min(3, { error: "Este campo deve ter no mínimo 3 caracteres" })
        .max(30, { error: "Este campo deve ter no máximo 30 caracteres" }),
      masterPassword: z
        .string({ error: "Este campo deve ser uma string" })
        .min(8, { error: "Este campo deve ter no mínimo 8 caracteres" })
        .max(16, { error: "Este campo deve ter no máximo 16 caracteres" }),
    })
    .optional(),
  params: z.object({
    ownerId: z.uuid(),
  }),
});

export const deleteSecretSchema = z.object({
  params: z.object({
    ownerId: z.uuid(),
  }),
  body: z.object({
    id: z.uuid(),
  }),
});

export const updateSecretSchema = z.object({
  params: z.object({
    ownerId: z.uuid(),
  }),
  body: z.object({
    id: z.uuid(),
    loginIdentifier: z
      .string({ error: "Este campo deve ser uma string" })
      .min(3, { error: "Este campo deve ter no mínimo 3 caracteres" })
      .max(30, { error: "Este campo deve ter no máximo 30 caracteres" })
      .optional(),
    ciphertext: z
      .string({ error: "Este campo deve ser uma string" })
      .optional(),
    iv: z.string({ error: "Este campo deve ser uma string" }).optional(),
    authTag: z.string({ error: "Este campo deve ser uma string" }).optional(),
  }),
});

export const createSecretSchema = z.object({
  params: z.object({
    ownerId: z.uuid(),
  }),
  body: z.object({
    site: z.string({ error: "Este campo deve ser uma string " }),
    loginIdentifier: z
      .string({ error: "Este campo deve ser uma string" })
      .min(3, { error: "Este campo deve ter no mínimo 3 caracteres" })
      .max(30, { error: "Este campo deve ter no máximo 30 caracteres" }),
    passwordToEncrypt: z
      .string({ error: "Este campo deve ser uma string" })
      .min(1, { error: "Este campo deve ter no mínimo 1 caractere" })
      .max(20, { error: "Este campo deve ter no máximo 20 caracteres" }),
    masterPassword: z
      .string({ error: "Este campo deve ser uma string" })
      .min(8, { error: "Este campo deve ter no mínimo 8 caracteres" })
      .max(16, { error: "Este campo deve ter no máximo 16 caracteres" }),
  }),
});
