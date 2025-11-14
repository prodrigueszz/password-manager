import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.service";

export class UserController {
  constructor(private readonly userService: UserService) {}

  public async createNewUser(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const existingUser = await this.userService.findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({
        status: "fail",
        data: {
          message: "User already exists"
        }
      })
    }

    try {
      const data = {
        name,
        email,
        password,
      };

      const id = await this.userService.saveNewUser(data);

      res.status(201).json({
        status: "success",
        data: {
          user: {
            id,
          },
        },
      });
    } catch (error) {
      res.status(400).json({
        status: "error",
        message: error instanceof Error ? error.message : "Erro ao criar usuário"
      });
    }
  }

  public async findUser(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const user = id ? await this.userService.findUserById(id) : null;
      res.status(200).json({
        status: "success",
        data: {
          user,
        },
      });
    } catch (e) {
      res.status(404).json({
        status: "fail",
        message: "Usuário não encontrado"
      });
    }
  }

  public async getAllUsers(req: Request, res: Response) {
    try {
      const users = await this.userService.getAllUsers();
      res.status(200).json({
        status: "success",
        data: {
          users,
        },
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Erro interno do servidor"
      });
    }
  }

  public async updateUser(req: Request, res: Response) {
    const { id } = req.params;
    const updateData = req.body;

    if (!id) {
      return res.status(400).json({
        status: "fail",
        message: "ID do usuário é obrigatório"
      });
    }

    try {
      const updatedUser = await this.userService.updateUser(id, updateData);
      res.status(200).json({
        status: "success",
        data: {
          user: updatedUser,
        },
      });
    } catch (error) {
      res.status(404).json({
        status: "fail",
        message: "Usuário não encontrado ou não foi possível atualizar"
      });
    }
  }

  public async deleteUser(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        status: "fail",
        message: "ID do usuário é obrigatório"
      });
    }

    try {
      const deletedUser = await this.userService.deleteUser(id);
      res.status(200).json({
        status: "success",
        data: {
          user: deletedUser,
        },
      });
    } catch (error) {
      res.status(404).json({
        status: "fail",
        message: "Usuário não encontrado ou não foi possível deletar"
      });
    }
  }
}
