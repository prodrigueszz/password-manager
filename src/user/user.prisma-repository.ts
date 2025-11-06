import { PrismaClient } from "../generated/prisma/internal/class";
import { User } from "./user";
import { DeleteUserDTO, UpdateUserDTO } from "./user.dto";
import { UserRepository } from "./user.repository";

export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async save(user: User): Promise<string> {
    const data = {
      name: user.getName(),
      email: user.getEmail(),
      password: user.getPassword(),
    };

    const { id } = await this.prisma.user.create({
      data,
    });
    return id;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const userData = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!userData) {
      return userData;
    }

    const { id, name, password } = userData;
    const user = User.build(name, email, password, id);
    return user;
  }

  async getUserById(id: string): Promise<User | null> {
    const userData = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!userData) {
      return null;
    }

    const { name, email, password } = userData;
    const user = User.build(name, email, password, id);
    return user;
  }

  async updateUserById(id: string, data: UpdateUserDTO): Promise<User | null> {
    const updatedUserData = await this.prisma.user.update({
      where: { id },
      data: data,
    });
    
    const { name, email, password } = updatedUserData;
    const updatedUser = User.build(id, name, email, password);
    return updatedUser;
  }

  async deleteUserById(id: string): Promise<DeleteUserDTO> {
    const output = await this.prisma.user.delete({
      where: {
        id,
      },
    });

    const deletedUserData = {
      id,
      name: output.name,
      email: output.email,
    };

    return deletedUserData;
  }
}
