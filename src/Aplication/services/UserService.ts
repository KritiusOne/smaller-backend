import { injectable, inject } from "tsyringe";
import { DI_TOKENS } from "@src/Infraestructure/di/tokens";
import { IUserService } from "@src/Domain/services/IUserService";
import { IUserRepository } from "@src/Domain/repositories/IUserRepository";
import { IUser } from "@src/Domain/entities/User";

@injectable()
export class UserService implements IUserService {
  constructor(@inject(DI_TOKENS.IUserRepository) private userRepository: IUserRepository) {}

  async getUserById(id: string): Promise<IUser | null> {
    return await this.userRepository.findById(id);
  }

  async getUserByEmail(email: string): Promise<IUser | null> {
    return await this.userRepository.findByEmail(email);
  }

  async getAllUsers(): Promise<IUser[]> {
    return await this.userRepository.findAll();
  }

  async createUser(name: string, email: string): Promise<IUser> {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('Email already exists');
    }

    return await this.userRepository.create({ name, email });
  }

  async updateUser(id: string, data: Partial<Omit<IUser, 'id'>>): Promise<IUser | null> {
    if (data.email) {
      const existingUser = await this.userRepository.findByEmail(data.email);
      if (existingUser && existingUser.id !== id) {
        throw new Error('Email already exists');
      }
    }

    return await this.userRepository.update(id, data);
  }

  async deleteUser(id: string): Promise<boolean> {
    return await this.userRepository.delete(id);
  }
}
