import { z } from "zod";
import { deleteSecretSchema, getSecretSchema, secretSchema, updateSecretSchema } from "./secret.schema";

export type UpdateSecretData = {
  password?: string;
  login_identifier?: string;
};

export type CreateSecretInputDTO = Omit<z.infer<typeof secretSchema>, "id">;
export type CreateSecretOutputDTO = {
  id: z.infer<typeof secretSchema>["id"];
};

export type FindSecretInputDTO = {
  owner_id: string,
  site?: string
}
export type FindSecretOutputDTO = z.infer<typeof secretSchema>;

export type DeleteSecretInputDTO = {
  owner_id: string,
  id: string
}

export type UpdateSecretInputDTO = z.infer<typeof updateSecretSchema>;
export type UpdateSecretOutputDTO = z.infer<typeof updateSecretSchema>["body"];
