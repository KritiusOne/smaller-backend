import { IUser } from "../entities/User";

export interface IUserService {
  getUserById(id: string): Promise<IUser | null>;
  getUserByEmail(email: string): Promise<IUser | null>;
  getAllUsers(): Promise<IUser[]>;
  createUser(name: string, email: string): Promise<IUser>;
  updateUser(id: string, data: Partial<Omit<IUser, 'id'>>): Promise<IUser | null>;
  deleteUser(id: string): Promise<boolean>;
}
