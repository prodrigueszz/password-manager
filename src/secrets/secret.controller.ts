import { Request, Response } from "express";
import { SecretService } from "./secret.service";
import { deleteSecretSchema, getSecretSchema, updateSecretSchema } from "./secret.schema";
import z from "zod";

export class SecretController {
  constructor(private secretService: SecretService){}

  async handleCreateSecret(req: Request, res: Response) {
    const { site, login_identifier, password, owner_id } = req.body;

    const output = await this.secretService.saveNewSecret({ 
      site, 
      login_identifier, 
      password, 
      owner_id
    });

    res.status(201).json({
      status: "success",
      data: {
        id: output.id
      }
    })
  }

  async handleFindSecret(req: Request, res: Response) {
    const result = await getSecretSchema.safeParseAsync({
      body: req.body,
      params: req.params
    });

    if (!result.success) {
      const error = z.treeifyError(result.error)

      return res.status(400).json({
        status: "fail",
        data: error.properties
      })
    }

    const owner_id = result.data.params.id;

    if (result.data.body) {
      const site = result.data.body.site;
      const output = await this.secretService.findSecret({
        owner_id,
        site
      })

      return res.status(200).json({
        status: "success",
        data: output
      })
    }

    const output = await this.secretService.findSecret({
      owner_id
    })

    return res.status(200).json({
      status: "success",
      data: output
    })
  }

  async handleDeleteSecret(req: Request, res: Response) {
    const result = await deleteSecretSchema.safeParseAsync({
      body: req.body,
      params: req.params
    });

    if (!result.success) {
      const error = z.treeifyError(result.error);

      return res.status(400).json({
        status: "fail",
        data: error.properties
      })
    }

    const owner_id = result.data.params.id;
    const id = result.data.body.id;

    await this.secretService.deleteSecret({ owner_id, id });

    return res.status(200).json({
      status: "success",
      data: {
        message: `Secret with id < ${id} > was deleted`
      }
    })
  }

  async handleUpdateSecret(req: Request, res: Response) {
    const result = await updateSecretSchema.safeParseAsync({
      body: req.body,
      params: req.params
    })

    if (!result.success) {
      const error = z.treeifyError(result.error);

      return res.status(400).json({
        status: "fail",
        data: error.properties
      })
    }

    const output = await this.secretService.updateSecret(result.data);

    return res.status(200).json({
      status: "success",
      data: {
        updatedSecret: output
      }
    })
  }
}