import { z } from "zod";
import { userSchema } from "./user.schema";

export type CreateUserInputDTO = Omit<z.infer<typeof userSchema>, "id">;
export type CreateUserOutputDTO = z.infer<typeof userSchema>["id"];

export type GetUserInputDTO = z.infer<typeof userSchema>["id"];
export type GetUserOutputDTO = Omit<z.infer<typeof userSchema>, "id">;

export type DeleteUserDTO = Omit<z.infer<typeof userSchema>, "password">;

export type UpdateUserInputDTO = {
  name?: string,
  email?: string,
  password?: string,
};

export type UpdateUserOutputDTO = Omit<z.infer<typeof userSchema>, "id" | "password">