import { Role } from "../generated/prisma/enums";
import { PrismaClient } from "../generated/prisma/internal/class";
import { PrismaClientKnownRequestError } from "../generated/prisma/internal/prismaNamespace";
import { User } from "./user";
import { DeleteUserDTO, UpdateUserInputDTO, UpdateUserOutputDTO } from "./user.dto";
import { UserRepository } from "./user.repository";

export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async save(user: User): Promise<string> {
    const data = {
      name: user.name,
      email: user.email,
      password: user.password,
      role: Role.USUARIO,
      master_key_salt: user.masterKeySalt,
    };

    const { id } = await this.prisma.user.create({
      data,
    });
    return id;
  }

  async getByEmail(email: string): Promise<User | null> {
    const userData = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!userData) {
      return userData;
    }

    const { id, name, password, role, master_key_salt } = userData;
    const user = User.build(id, name, email, password, role, master_key_salt);
    return user;
  }

  async getById(id: string): Promise<User | null> {
    const userData = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!userData) {
      return userData;
    }

    const { name, email, password, role, master_key_salt } = userData;
    const user = User.build(id, name, email, password, role, master_key_salt);
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    const usersData = await this.prisma.user.findMany();

    return usersData.map((userData) => {
      const { id, name, email, password, role, master_key_salt } = userData;
      return User.build(id, name, email, password, role, master_key_salt);
    });
  }

  async updateUserById(id: string, data: UpdateUserInputDTO): Promise<UpdateUserOutputDTO | null> {
    try {
      const updateData: Record<string, string> = {};

      if (data.name !== undefined) {
        updateData.name = data.name;
      }
      if (data.email !== undefined) {
        updateData.email = data.email;
      }
      if (data.password !== undefined) {
        updateData.password = data.password;
      }

      const updatedUserData = await this.prisma.user.update({
        where: { id },
        data: updateData,
      });
      const { name, email } = updatedUserData;
      return { name, email };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw error;
      }
    }

    return null;
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
      role: output.role,
    };

    return deletedUserData;
  }
}
