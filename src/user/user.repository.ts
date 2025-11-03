import { User } from "./user";

export type userId = string;

export interface UserRepository {
  save(user: User): Promise<userId>;
}