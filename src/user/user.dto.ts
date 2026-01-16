import { z } from "zod";
import { userSchema, updateUserSchema, createUserSchema } from "./user.schema";

export type CreateUserInputDTO = z.infer<typeof createUserSchema>;
export type CreateUserOutputDTO = z.infer<typeof userSchema>["id"];

export type GetUserInputDTO = z.infer<typeof userSchema>["id"];
export type GetUserOutputDTO = z.infer<typeof userSchema>;

export type DeleteUserDTO = Omit<z.infer<typeof userSchema>, "password" | "masterKeySalt">;

export type UpdateUserInputDTO = z.infer<typeof updateUserSchema>["body"];

export type UpdateUserOutputDTO = Omit<z.infer<typeof userSchema>, "id" | "password" | "role" | "masterKeySalt">;