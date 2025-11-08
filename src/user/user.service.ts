import { User } from "./user";
import { CreateUserInputDTO, CreateUserOutputDTO, GetUserInputDTO, GetUserOutputDTO } from "./user.dto";
import { UserRepository } from "./user.repository";

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async saveNewUser(data: CreateUserInputDTO): Promise<CreateUserOutputDTO> {
    const { name, email, password } = data;

    const newUser = User.create(name, email, password);
    const output = await this.userRepository.save(newUser);

    return output;
  }

  async findUserById(data: GetUserInputDTO): Promise<GetUserOutputDTO> {
    const user = await this.userRepository.getUserById(data);
    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    const output = {
      name: user.name,
      email: user.name,
      password: user.password
    }

    return output;
  }
}
