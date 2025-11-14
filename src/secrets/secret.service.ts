import { CreateSecretInputDTO, CreateSecretOutputDTO, DeleteSecretInputDTO, FindSecretInputDTO, FindSecretOutputDTO, UpdateSecretData, UpdateSecretInputDTO, UpdateSecretOutputDTO} from "./secret.dto";
import { SecretRepository } from "./secret.repository";
import { Secret } from "./secrets";

export class SecretService {
  constructor(private readonly secretRepository: SecretRepository) {}
  
  async saveNewSecret(data: CreateSecretInputDTO): Promise<CreateSecretOutputDTO> {
    
    const newSecret = Secret.build(
      "",
      data.site,
      data.login_identifier,
      data.password,
      data.owner_id
    );
    
    const id = await this.secretRepository.save(newSecret);
    
    return { id };
  }
  
  // getAllByOwner(owner_id: string): Promise<Secret[] | null>;
  // getBySiteName(owner_id: string, site: string): Promise<Secret | null>;
  async findSecret(data: FindSecretInputDTO): Promise<FindSecretOutputDTO[] | FindSecretOutputDTO | null> {
    if (data.site) {
      const secret = await this.secretRepository.getBySiteName(data.owner_id, data.site);
      return secret ? {
        id: secret.id,
        site: secret.site,
        login_identifier: secret.login_identifier,
        password: secret.password,
        owner_id: secret.owner_id
      } : secret
    }

    const secretsList = await this.secretRepository.getAllByOwner(data.owner_id);
    return secretsList ? secretsList.map(secret => {
      return {
        id: secret.id,
        site: secret.site,
        login_identifier: secret.login_identifier,
        password: secret.password,
        owner_id: secret.owner_id
      }
    }) : secretsList
  }

  // deleteById(owner_id: string, id: string): Promise<void>;
  async deleteSecret(data: DeleteSecretInputDTO): Promise<void> {
    await this.secretRepository.deleteById(data.id, data.id);
  }

  // updateById(owner_id: string, id: string, data: UpdateSecretData): Promise<void>;
  async updateSecret(data: UpdateSecretInputDTO): Promise<UpdateSecretOutputDTO> {
    const { id, ...attrsToUpdate } = data.body;

    const createUpdateData = (password?: string | undefined, login?: string | undefined) => {
      const data: UpdateSecretData = {}

      if (password !== undefined) {
        data.password = password;
      } 
      if (login !== undefined) {
        data.login_identifier = login;
      }

      return data;
    }

    await this.secretRepository.updateById(
      data.params.id, 
      data.body.id,
      createUpdateData(attrsToUpdate.password, attrsToUpdate.login_identifier) 
    )

    return {
      id,
      password: attrsToUpdate.password,
      login_identifier: attrsToUpdate.login_identifier
    }
  }
}