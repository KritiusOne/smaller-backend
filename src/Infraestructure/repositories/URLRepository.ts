import { IURLRepository } from "@src/Domain/repositories/IURLRepository";
import { IURL } from "@src/Domain/entities/URL";
import { URLModel } from "../db/schemes/URLScheme";
import crypto from 'crypto';

export class URLRepository implements IURLRepository {
  async findById(id: string): Promise<IURL | null> {
    const url = await URLModel.findOne({ id });
    return url ? url.toObject() : null;
  }

  async findByShortURL(shortURL: string): Promise<IURL | null> {
    const url = await URLModel.findOne({ shortURL });
    return url ? url.toObject() : null;
  }

  async findByUserId(userId: string): Promise<IURL[]> {
    const urls = await URLModel.find({ userId });
    return urls.map(url => url.toObject());
  }

  async findAll(): Promise<IURL[]> {
    const urls = await URLModel.find();
    return urls.map(url => url.toObject());
  }

  async create(urlData: Omit<IURL, 'id' | 'createdAt'>): Promise<IURL> {
    const newURL = await URLModel.create({
      id: crypto.randomUUID(),
      createdAt: new Date(),
      ...urlData
    });
    const savedURL = await newURL.save();
    return savedURL.toObject();
  }

  async delete(id: string): Promise<boolean> {
    const result = await URLModel.deleteOne({ id });
    return result.deletedCount > 0;
  }
}
