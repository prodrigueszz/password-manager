import { CreateSecretInputDTO, CreateSecretOutputDTO, DeleteSecretInputDTO, FindSecretInputDTO, FindSecretOutputDTO, UpdateSecretData, UpdateSecretInputDTO, UpdateSecretOutputDTO} from "./secret.dto";
import { SecretRepository } from "./secret.repository";
import { Secret } from "./secrets";

export class SecretService {
  constructor(private readonly secretRepository: SecretRepository) {}
  
  async saveNewSecret(data: CreateSecretInputDTO): Promise<CreateSecretOutputDTO> {
    const newSecret = Secret.build(
      "",
      data.site,
      data.loginIdentifier,
      data.ciphertext,
      data.iv,
      data.authTag,
      new Date(),
      new Date(),
      data.ownerId
    );
    
    const id = await this.secretRepository.save(newSecret);
    
    return { id };
  }
  
  async findSecret(data: FindSecretInputDTO): Promise<FindSecretOutputDTO[] | FindSecretOutputDTO | null> {
    if (data.site) {
      const secret = await this.secretRepository.getBySiteName(data.ownerId, data.site);
      return secret ? {
        id: secret.id,
        site: secret.site,
        loginIdentifier: secret.loginIdentifier,
        ciphertext: secret.ciphertext,
        iv: secret.iv,
        authTag: secret.authTag,
        createdAt: secret.createdAt,
        updatedAt: secret.updatedAt,
        ownerId: secret.ownerId
      } : null;
    }

    const secretsList = await this.secretRepository.getAllByOwner(data.ownerId);
    return secretsList.map(secret => {
      return {
        id: secret.id,
        site: secret.site,
        loginIdentifier: secret.loginIdentifier,
        ciphertext: secret.ciphertext,
        iv: secret.iv,
        authTag: secret.authTag,
        createdAt: secret.createdAt,
        updatedAt: secret.updatedAt,
        ownerId: secret.ownerId
      };
    });
  }

  async deleteSecret(data: DeleteSecretInputDTO): Promise<void> {
    await this.secretRepository.deleteById(data.ownerId, data.id);
  }

  async updateSecret(data: UpdateSecretInputDTO): Promise<UpdateSecretOutputDTO> {
    const { id, ...attrsToUpdate } = data.body;

    const createUpdateData = (
      loginIdentifier?: string,
      ciphertext?: string,
      iv?: string,
      authTag?: string
    ): UpdateSecretData => {
      const updateData: UpdateSecretData = {};

      if (loginIdentifier !== undefined) {
        updateData.loginIdentifier = loginIdentifier;
      }
      if (ciphertext !== undefined) {
        updateData.ciphertext = ciphertext;
      }
      if (iv !== undefined) {
        updateData.iv = iv;
      }
      if (authTag !== undefined) {
        updateData.authTag = authTag;
      }

      return updateData;
    };

    await this.secretRepository.updateById(
      data.params.ownerId,
      data.body.id,
      createUpdateData(
        attrsToUpdate.loginIdentifier,
        attrsToUpdate.ciphertext,
        attrsToUpdate.iv,
        attrsToUpdate.authTag
      )
    );

    return {
      id,
      loginIdentifier: attrsToUpdate.loginIdentifier,
      ciphertext: attrsToUpdate.ciphertext,
      iv: attrsToUpdate.iv,
      authTag: attrsToUpdate.authTag
    };
  }
}