import { User } from "./user";
import { DeleteUserDTO, UpdateUserDTO } from "./user.dto";

export interface UserRepository {
  save(user: User): Promise<string>;
  getUserByEmail(email: string): Promise<User | null>;
  getUserById(id: string): Promise<User | null>; 
  updateUserById(id: string, data: UpdateUserDTO): Promise<User | null>;
  deleteUserById(id: string): Promise<DeleteUserDTO>;
}