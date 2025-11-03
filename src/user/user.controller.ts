import { Request, Response } from "express";
import { UserRepository } from "./user.repository";

export class UserController {
  constructor(private readonly repository: UserRepository){}
}