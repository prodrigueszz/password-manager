import { Role } from "../generated/prisma/enums";
import { UserRepository } from "../user/user.repository";
import { LoginInputDTO, LoginOutputDTO } from "./auth.dto";
import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';

export class AuthService {
  private duration: number;
  constructor(private userRepository: UserRepository) {
    this.duration = parseInt(process.env.JWT_DURATION!) | 15;
  }

  private generateToken(payload: { sub: string, role: Role }) {
    const secret = process.env.JWT_SECRET!;
    const token = jwt.sign(payload, secret, {expiresIn: this.duration});

    return token;
  }

  async login(data: LoginInputDTO): Promise<LoginOutputDTO> {
    const user = await this.userRepository.getByEmail(data.email);
    if (!user) {
      return {
        isFound: false,
        token: null
      }
    }

    const isPasswordValid = await compare(data.password, user.password);
    if (!isPasswordValid) {
      return { isFound: true, token: null }
    }

    const payload = {
      sub: user.id,
      role: user.role
    }

    const token = this.generateToken(payload);

    return {
      isFound: true,
      token: token
    }
  } 
}