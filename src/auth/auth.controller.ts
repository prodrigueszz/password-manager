import { Request, Response, NextFunction } from "express";
import { AuthService } from "./auth.service";
import { loginSchema } from "./auth.schema";
import z from "zod";

export class AuthController {
  constructor(private authService: AuthService) {}
  
  handleLogin = async (req: Request, res: Response, next: NextFunction) => {
    const result = await loginSchema.safeParseAsync(req.body);
    if (!result.success) {
      const error = z.treeifyError(result.error);
      return res.status(400).json({
        status: "fail",
        data: error.properties
      })
    }

    const output = await this.authService.login(req.body);
    if (!output.isFound) {
      return res.status(403).json({
        status: "fail",
        data: {
          message: "Email ou senha inválidos"
        }
      })
    }

    output.token ? res.status(200).json({
      status: "success",
      data: {
        token: output.token
      }
    }) : res.status(403).json({
      status: "fail",
      data: {
        message: "Email ou senha inválidos"
      }
    })
  }
}
