import { z } from "zod";

export const userSchema = z.object({
  id: z.uuid(),
  name: z.string().min(3).max(15),
  email: z.email(),
  password: z.hash("sha256"),
});

export const createUserSchema = z.object({
  name: z.string().min(3).max(15),
  email: z.email(),
  password: z.string().min(8).max(16),
});

export const getUserSchema = z.object({
  params: z.object({
    id: z.uuid(),
  }),
});

export const updateUserFields = z.object({
  name: z.string().min(3).max(15),
  email: z.email(),
  password: z.hash("sha256"),
});

export const updateUserSchema = z.object({
  body: updateUserFields.partial(),
  params: z.object({
    id: z.uuid(),
  }),
});

export const deleteUserSchema = z.object({
  id: z.uuid(),
});

export type CreateUserInputDTO = z.infer<typeof createUserSchema>;
export type CreateUserOutputDTO = z.infer<typeof userSchema>["id"];
export type GetUserInputDTO = z.infer<typeof getUserSchema>["params"]["id"];
export type GetUserOutputDTO = Omit<z.infer<typeof userSchema>, "id">;
export type DeleteUserDTO = Omit<z.infer<typeof userSchema>, "password">;
export type UpdateUserDTO = {
  name?: string;
  email?: string;
  password?: string;
};
