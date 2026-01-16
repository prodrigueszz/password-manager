import { Request, Response } from "express";
import { SecretService } from "./secret.service";
import { createSecretSchema, deleteSecretSchema, getSecretSchema, updateSecretSchema } from "./secret.schema";
import z from "zod";
import { CryptoService } from "../crypto/crypto.service";
import { UserService } from "../user/user.service";

export class SecretController {
  constructor(
    private secretService: SecretService,
    private userService: UserService
  ) {}

  async createSecret(req: Request, res: Response) {
    const result = await createSecretSchema.safeParseAsync({
      params: req.params,
      body: req.body,
    });

    if (!result.success) {
      const error = z.treeifyError(result.error);

      return res.status(400).json({
        status: "fail",
        data: error.properties,
      });
    }

    const userData = await this.userService.findUserById(result.data.params.ownerId);

    if (!userData) {
      return res.status(404).json({
        status: "fail",
        data: {
          message: "Usuário não encontrado",
        },
      });
    }

    const encryptedData = await CryptoService.encrypt(
      result.data.body.passwordToEncrypt,
      result.data.body.masterPassword,
      userData.masterKeySalt
    );

    const output = await this.secretService.saveNewSecret({
      site: result.data.body.site,
      loginIdentifier: result.data.body.loginIdentifier,
      ciphertext: encryptedData.ciphertext,
      iv: encryptedData.iv,
      authTag: encryptedData.authTag,
      ownerId: userData.id,
    });

    return res.status(201).json({
      status: "success",
      data: {
        id: output.id,
      },
    });
  }

  async findSecret(req: Request, res: Response) {
    const result = await getSecretSchema.safeParseAsync({
      body: req.body,
      params: req.params,
    });

    if (!result.success) {
      const error = z.treeifyError(result.error);

      return res.status(400).json({
        status: "fail",
        data: error.properties,
      });
    }

    const ownerId = result.data.params.ownerId;

    if (result.data.body) {
      const { site, masterPassword } = result.data.body;

      const output = await this.secretService.findSecret({
        ownerId,
        site,
      });

      if (!output || Array.isArray(output)) {
        return res.status(404).json({
          status: "fail",
          data: { message: "Não foi possível encontrar a senha desejada" },
        });
      }

      const userData = await this.userService.findUserById(ownerId);

      if (!userData) {
        return res.status(404).json({
          status: "fail",
          data: { message: "Usuário não encontrado" },
        });
      }

      const decryptedPassword = await CryptoService.decrypt(
        {
          ciphertext: output.ciphertext,
          iv: output.iv,
          authTag: output.authTag,
        },
        masterPassword,
        userData.masterKeySalt
      );

      return res.status(200).json({
        status: "success",
        data: {
          id: output.id,
          site: output.site,
          loginIdentifier: output.loginIdentifier,
          password: decryptedPassword,
        },
      });
    }

    const output = await this.secretService.findSecret({
      ownerId,
    });

    return res.status(200).json({
      status: "success",
      data: output,
    });
  }

  async deleteSecret(req: Request, res: Response) {
    const result = await deleteSecretSchema.safeParseAsync({
      body: req.body,
      params: req.params,
    });

    if (!result.success) {
      const error = z.treeifyError(result.error);

      return res.status(400).json({
        status: "fail",
        data: error.properties,
      });
    }

    const ownerId = result.data.params.ownerId;
    const id = result.data.body.id;

    await this.secretService.deleteSecret({ ownerId, id });

    return res.status(200).json({
      status: "success",
      data: {
        message: `Secret with id < ${id} > was deleted`,
      },
    });
  }

  async updateSecret(req: Request, res: Response) {
    const result = await updateSecretSchema.safeParseAsync({
      body: req.body,
      params: req.params,
    });

    if (!result.success) {
      const error = z.treeifyError(result.error);

      return res.status(400).json({
        status: "fail",
        data: error.properties,
      });
    }

    const output = await this.secretService.updateSecret(result.data);

    return res.status(200).json({
      status: "success",
      data: {
        updatedSecret: output,
      },
    });
  }
}