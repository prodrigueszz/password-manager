import { promisify } from "util";
import { Role } from "../generated/prisma/enums";
import { User } from "./user";
import { CreateUserInputDTO, CreateUserOutputDTO, GetUserInputDTO, GetUserOutputDTO, UpdateUserInputDTO, UpdateUserOutputDTO, DeleteUserDTO } from "./user.dto";
import { UserRepository } from "./user.repository";
import { hash, genSalt } from "bcrypt";
import { randomBytes } from "crypto";

const asyncRandomBytes = promisify(randomBytes);

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async saveNewUser(data: CreateUserInputDTO): Promise<CreateUserOutputDTO> {
    const { name, email, password } = data;

    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);
    const masterKeySalt = await asyncRandomBytes(16).toString();

    const newUser = User.build("", name, email, hashedPassword, Role.USUARIO, masterKeySalt);
    const output = await this.userRepository.save(newUser);

    return output;
  }

  async findUserById(data: GetUserInputDTO): Promise<GetUserOutputDTO | null> {
    const user = await this.userRepository.getById(data);
    if (!user) {
      return null;
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
      masterKeySalt: user.masterKeySalt
    };
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.getByEmail(email);
    return user;
  }

  async getAllUsers(): Promise<GetUserOutputDTO[]> {
    const users = await this.userRepository.getAllUsers();
    return users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
      masterKeySalt: user.masterKeySalt
    }));
  }

  async updateUser(id: string, data: UpdateUserInputDTO): Promise<UpdateUserOutputDTO | null> {
    const updatedUser = await this.userRepository.updateUserById(id, data);
    return updatedUser;
  }

  async deleteUser(id: string): Promise<DeleteUserDTO> {
    try {
      const deletedUser = await this.userRepository.deleteUserById(id);
      return deletedUser;
    } catch (error) {
      throw new Error("Usuário não encontrado ou não foi possível deletar");
    }
  }
}

