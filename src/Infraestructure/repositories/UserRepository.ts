import { IUserRepository } from "@src/Domain/repositories/IUserRepository";
import { IUser } from "@src/Domain/entities/User";
import { UserModel } from "../db/schemes/UserScheme";
import crypto from 'crypto';

export class UserRepository implements IUserRepository {
  async findById(id: string): Promise<IUser | null> {
    const user = await UserModel.findOne({ id });
    return user ? user.toObject() : null;
  }

  async findByEmail(email: string): Promise<IUser | null> {
    const user = await UserModel.findOne({ email });
    return user ? user.toObject() : null;
  }

  async findAll(): Promise<IUser[]> {
    const users = await UserModel.find();
    return users.map(user => user.toObject());
  }

  async create(userData: Omit<IUser, 'id'>): Promise<IUser> {
    const newUser = await UserModel.create({
      id: crypto.randomUUID(),
      ...userData
    });
    const savedUser = await newUser.save();
    return savedUser.toObject();
  }

  async update(id: string, userData: Partial<IUser>): Promise<IUser | null> {
    const updatedUser = await UserModel.findOneAndUpdate(
      { id },
      { $set: userData },
      { new: true }
    );
    return updatedUser ? updatedUser.toObject() : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await UserModel.deleteOne({ id });
    return result.deletedCount > 0;
  }
}
