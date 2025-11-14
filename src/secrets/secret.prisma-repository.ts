import { PrismaClient } from "../generated/prisma/client";
import { UpdateSecretData } from "./secret.dto";
import { SecretRepository } from "./secret.repository";
import { Secret } from "./secrets";

export class SecretPrismaRepository implements SecretRepository {
  constructor(private readonly prisma: PrismaClient){}

  async save(secret: Secret): Promise<string> {
    const data = {
      site: secret.site,
      login_identifier: secret.login_identifier,
      password: secret.password,
      owner_id: secret.owner_id
    }

    const { id } = await this.prisma.secret.create({
      data
    })

    return id;
  }

  async getAllByOwner(owner_id: string): Promise<Secret[]> {
    const data = await this.prisma.secret.findMany({
      where: { owner_id }
    })

    const secretList = data.map(s => {
      const secret = Secret.build(s.id, s.site, s.login_identifier, s.password, s.owner_id);
      return secret;
    })

    return secretList;
  }

  async getBySiteName(owner_id: string, site: string): Promise<Secret | null> {
    const data = await this.prisma.secret.findFirst({
      where: { owner_id, site }
    })

    if (!data) {
      return null;
    }

    const secret = Secret.build(
      data.id,
      data.site,
      data.login_identifier,
      data.password,
      data.owner_id      
    );

    return secret;
  }

  async deleteById(owner_id: string, id: string): Promise<void> {
    await this.prisma.secret.delete({
      where: { id, owner_id }
    })
  }

  async updateById(owner_id: string, id: string, data: UpdateSecretData): Promise<void> {
    await this.prisma.secret.update({
      where: { id, owner_id },
      data
    })
  }
}