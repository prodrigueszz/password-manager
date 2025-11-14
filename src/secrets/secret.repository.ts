import { UpdateSecretData } from "./secret.dto";
import { Secret } from "./secrets";

export interface SecretRepository {
  save(secret: Secret): Promise<string>;
  getAllByOwner(owner_id: string): Promise<Secret[] | null>;
  getBySiteName(owner_id: string, site: string): Promise<Secret | null>;
  deleteById(owner_id: string, id: string): Promise<void>;
  updateById(owner_id: string, id: string, data: UpdateSecretData): Promise<void>;
}