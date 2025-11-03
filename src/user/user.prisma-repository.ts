import { PrismaClient } from "../generated/prisma/internal/class";
import { User } from "./user";
import { userId, UserRepository } from "./user.repository";

export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaClient){}

  async save(user: User): Promise<userId> {
    const { id } = await this.prisma.user.create({
      data: {
        name: user.getName(),
        email: user.getEmail(),
        password: user.getPassword()
      }
    })

    return id;
  }
}