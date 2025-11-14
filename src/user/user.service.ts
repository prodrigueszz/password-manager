import { User } from "./user";
import { CreateUserInputDTO, CreateUserOutputDTO, GetUserInputDTO, GetUserOutputDTO, UpdateUserInputDTO, UpdateUserOutputDTO, DeleteUserDTO } from "./user.dto";
import { UserRepository } from "./user.repository";
import { hash } from 'bcrypt';

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async saveNewUser(data: CreateUserInputDTO): Promise<CreateUserOutputDTO> {
    const { name, email, password } = data;

    const salt = 10;
    const hashedPassword = await hash(password, salt);

    const newUser = User.create(name, email, hashedPassword);
    const output = await this.userRepository.save(newUser);

    return output;
  }

  async findUserById(data: GetUserInputDTO): Promise<GetUserOutputDTO> {
    const user = await this.userRepository.getById(data);
    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    const output = {
      name: user.name,
      email: user.email,
      password: user.password
    }

    return output;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.getByEmail(email);
    return user;
  }

  async getAllUsers(): Promise<GetUserOutputDTO[]> {
    const users = await this.userRepository.getAllUsers();
    return users.map(user => ({
      name: user.name,
      email: user.email,
      password: user.password
    }));
  }

  async updateUser(id: string, data: UpdateUserInputDTO): Promise<UpdateUserOutputDTO> {
    const updatedUser = await this.userRepository.updateUserById(id, data);
    if (!updatedUser) {
      throw new Error("Usuário não encontrado ou não foi possível atualizar");
    }
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

