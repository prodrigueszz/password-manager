import { z } from "zod";
import { Role } from "../generated/prisma/enums";

export const roleEnum = z.enum([Role.ADMIN, Role.USUARIO]);

export const userSchema = z.object({
  id: z.uuid({ error: "O id é um uuid" }),
  name: z
    .string({ error: "Este campo deve ser do tipo string" })
    .min(3, { error: "Este campo deve possuir no mínimo 3 caracteres" })
    .max(20, { error: "Este campo deve possuir no máximo 20 caracteres" }),
  email: z.email({ error: "Formato de email não permitido" }),
  password: z
    .string({ error: "Este campo deve ser do tipo string" })
    .min(8, { error: "Este campo deve possuir no mínimo 8 caracteres" })
    .max(16, { error: "Este campo deve possuir no máximo 16 caracteres" })
    .regex(/[a-z]/, {
      error: "Este campo deve conter pelo menos 1 letra minúscula",
    })
    .regex(/[A-Z]/, {
      error: "Este campo deve conter pelo menos 1 letra maiúscula",
    })
    .regex(/[0-9]/, { error: "Este campo deve conter um número" })
    .regex(/[!#@$%&]/, {
      error: "Este campo deve conter pelo menos 1 caractere especial",
    }),
  role: roleEnum,
  masterKeySalt: z.string(),
});

export const createUserSchema = z.object({
  name: z
    .string({ error: "Este campo deve ser uma string" })
    .min(3, { error: "Este campo deve possuir no mínimo 3 caracteres" })
    .max(20, { error: "Este campo deve possuir no máximo 20 caracteres" }),
  email: z.email({ error: "Formato de email não permitido" }),
  password: z
    .string({ error: "Este campo deve ser do tipo string" })
    .min(8, { error: "Este campo deve possuir no mínimo 8 caracteres" })
    .max(16, { error: "Este campo deve possuir no máximo 16 caracteres" })
    .regex(/[a-z]/, {
      error: "Este campo deve conter pelo menos 1 letra minúscula",
    })
    .regex(/[A-Z]/, {
      error: "Este campo deve conter pelo menos 1 letra maiúscula",
    })
    .regex(/[0-9]/, { error: "Este campo deve conter um número" })
    .regex(/[!#@$%&]/, {
      error: "Este campo deve conter pelo menos 1 caractere especial",
    })
    .nonoptional({ error: "Este campo é obrigatório" }),
});

export const getUserSchema = z.object({
  id: z.uuid(),
});

export const updateUserSchema = z.object({
  body: z.object({
    name: z
      .string({ message: "Este campo deve ser uma string" })
      .min(3, { message: "Este campo deve ter no mínimo 3 caracteres" })
      .max(20, { message: "Este campo deve ter no máximo 20 caracteres" })
      .optional(),
    email: z
      .email({ message: "Formato de email não permitido" })
      .optional(),
    password: z
      .string({ message: "Este campo deve ser do tipo string" })
      .min(8, { message: "Este campo deve possuir no mínimo 8 caracteres" })
      .max(16, { message: "Este campo deve possuir no máximo 16 caracteres" })
      .regex(/[a-z]/, {
        message: "Este campo deve conter pelo menos 1 letra minúscula",
      })
      .regex(/[A-Z]/, {
        message: "Este campo deve conter pelo menos 1 letra maiúscula",
      })
      .regex(/[0-9]/, { message: "Este campo deve conter um número" })
      .regex(/[!#@$%&]/, {
        message: "Este campo deve conter pelo menos 1 caractere especial",
      })
      .optional(),
  }).refine(data => Object.keys(data).length > 0, {
    message: "Pelo menos um campo deve ser fornecido para atualização"
  }),
  params: z.object({
    id: z.uuid({ message: "O id deve ser um UUID válido" })
  })
});

export const deleteUserSchema = z.object({
  id: z.uuid()
})