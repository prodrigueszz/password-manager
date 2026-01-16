import { PrismaClient } from "../generated/prisma/client";
import { UpdateSecretData } from "./secret.dto";
import { SecretRepository } from "./secret.repository";
import { Secret } from "./secrets";

export class SecretPrismaRepository implements SecretRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async save(secret: Secret): Promise<string> {
    const data = {
      site: secret.site,
      login_identifier: secret.loginIdentifier,
      ciphertext: secret.ciphertext,
      iv: secret.iv,
      auth_tag: secret.authTag,
      owner_id: secret.ownerId,
    };

    const { id } = await this.prisma.secret.create({
      data,
    });

    return id;
  }

  async getAllByOwner(ownerId: string): Promise<Secret[]> {
    const data = await this.prisma.secret.findMany({
      where: { owner_id: ownerId },
    });

    const secretList = data.map((s) => {
      const secret = Secret.build(
        s.id,
        s.site,
        s.login_identifier,
        s.ciphertext,
        s.iv,
        s.auth_tag,
        s.createdAt,
        s.updatedAt,
        s.owner_id
      );
      return secret;
    });

    return secretList;
  }

  async getBySiteName(ownerId: string, site: string): Promise<Secret | null> {
    const data = await this.prisma.secret.findFirst({
      where: { owner_id: ownerId, site },
    });

    if (!data) {
      return null;
    }

    const secret = Secret.build(
      data.id,
      data.site,
      data.login_identifier,
      data.ciphertext,
      data.iv,
      data.auth_tag,
      data.createdAt,
      data.updatedAt,
      data.owner_id
    );

    return secret;
  }

  async deleteById(ownerId: string, id: string): Promise<void> {
    await this.prisma.secret.delete({
      where: { id, owner_id: ownerId },
    });
  }

  async updateById(ownerId: string, id: string, data: UpdateSecretData): Promise<void> {
    const updateData: Record<string, string> = {};
    
    if (data.loginIdentifier !== undefined) {
      updateData.login_identifier = data.loginIdentifier;
    }
    if (data.ciphertext !== undefined) {
      updateData.ciphertext = data.ciphertext;
    }
    if (data.iv !== undefined) {
      updateData.iv = data.iv;
    }
    if (data.authTag !== undefined) {
      updateData.auth_tag = data.authTag;
    }

    await this.prisma.secret.update({
      where: { id, owner_id: ownerId },
      data: updateData,
    });
  }
}