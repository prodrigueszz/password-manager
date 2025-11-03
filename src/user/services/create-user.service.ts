import { User } from "../user";
import { CreateUserInputDTO, CreateUserOutputDTO } from "../user.dto";
import { UserRepository } from "../user.repository";
import { UserService } from "../user.service";

export class CreateUserService implements UserService<CreateUserInputDTO, CreateUserOutputDTO> {
  private constructor(private readonly userRepository: UserRepository){}

  public static create(userRepository: UserRepository): CreateUserService {
    return new CreateUserService(userRepository);
  }

  async execute(input: CreateUserInputDTO): Promise<CreateUserOutputDTO> {
    const { name, email, password } = input;

    const newUser = User.build(name, email, password);
    const output = await this.userRepository.save(newUser)

    return { id: output }
  }
}