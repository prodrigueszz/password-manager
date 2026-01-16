import { UpdateSecretData } from "./secret.dto";
import { Secret } from "./secrets";

export interface SecretRepository {
  save(secret: Secret): Promise<string>;
  getAllByOwner(ownerId: string): Promise<Secret[]>;
  getBySiteName(ownerId: string, site: string): Promise<Secret | null>;
  deleteById(ownerId: string, id: string): Promise<void>;
  updateById(ownerId: string, id: string, data: UpdateSecretData): Promise<void>;
}