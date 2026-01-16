import { z } from "zod";
import { secretSchema, updateSecretSchema } from "./secret.schema";

export type UpdateSecretData = {
  loginIdentifier?: string;
  ciphertext?: string;
  iv?: string;
  authTag?: string;
};

export type CreateSecretInputDTO = Omit<z.infer<typeof secretSchema>, "id" | "createdAt" | "updatedAt">;
export type CreateSecretOutputDTO = {
  id: z.infer<typeof secretSchema>["id"];
};

export type FindSecretInputDTO = {
  ownerId: string;
  site?: string;
};
export type FindSecretOutputDTO = z.infer<typeof secretSchema>;

export type DeleteSecretInputDTO = {
  ownerId: string;
  id: string;
};

export type UpdateSecretInputDTO = z.infer<typeof updateSecretSchema>;
export type UpdateSecretOutputDTO = z.infer<typeof updateSecretSchema>["body"];
