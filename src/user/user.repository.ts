import { User } from "./user";
import { DeleteUserDTO, UpdateUserInputDTO, UpdateUserOutputDTO } from "./user.dto";

export interface UserRepository {
  save(user: User): Promise<string>;
  getByEmail(email: string): Promise<User | null>;
  getById(id: string): Promise<User | null>; 
  getAllUsers(): Promise<User[]>;
  updateUserById(id: string, data: UpdateUserInputDTO): Promise<UpdateUserOutputDTO | null>;
  deleteUserById(id: string): Promise<DeleteUserDTO>;
}