import { Request, Response } from "express";
import { UserService } from "./user.service";
import { createUserSchema, getUserSchema, updateUserSchema, deleteUserSchema } from "./user.schema";
import z from "zod";

export class UserController {
  constructor(private readonly userService: UserService) {}

  async createNewUser(req: Request, res: Response) {
    const result = await createUserSchema.safeParseAsync(req.body);

    if (!result.success) {
      const error = z.treeifyError(result.error);

      return res.status(400).json({
        status: "fail",
        data: error.properties,
      });
    }

    const { name, email, password } = result.data;

    const existingUser = await this.userService.findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({
        status: "fail",
        data: {
          message: "User already exists",
        },
      });
    }

    const id = await this.userService.saveNewUser({ name, email, password });

    return res.status(201).json({
      status: "success",
      data: {
        id,
      },
    });
  }

  async findUser(req: Request, res: Response) {
    const result = await getUserSchema.safeParseAsync(req.params);

    if (!result.success) {
      const error = z.treeifyError(result.error);

      return res.status(400).json({
        status: "fail",
        data: error.properties,
      });
    }

    const user = await this.userService.findUserById(result.data.id);

    if (!user) {
      return res.status(404).json({
        status: "fail",
        data: {
          message: "Usuário não encontrado",
        },
      });
    }

    return res.status(200).json({
      status: "success",
      data: user,
    });
  }

  async getAllUsers(req: Request, res: Response) {
    const users = await this.userService.getAllUsers();

    return res.status(200).json({
      status: "success",
      data: users,
    });
  }

  async updateUser(req: Request, res: Response) {
    const result = await updateUserSchema.safeParseAsync({
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

    const updatedUser = await this.userService.updateUser(
      result.data.params.id,
      result.data.body
    );

    if (!updatedUser) {
      return res.status(404).json({
        status: "fail",
        data: {
          message: "Usuário não encontrado ou não foi possível atualizar",
        },
      });
    }

    return res.status(200).json({
      status: "success",
      data: {
        updatedUser,
      },
    });
  }

  async deleteUser(req: Request, res: Response) {
    const result = await deleteUserSchema.safeParseAsync(req.params);

    if (!result.success) {
      const error = z.treeifyError(result.error);

      return res.status(400).json({
        status: "fail",
        data: error.properties,
      });
    }

    const deletedUser = await this.userService.deleteUser(result.data.id);

    return res.status(200).json({
      status: "success",
      data: {
        deletedUser,
      },
    });
  }
}
