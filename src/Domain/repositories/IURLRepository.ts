import { IURL } from "../entities/URL";

export interface IURLRepository {
  findById(id: string): Promise<IURL | null>;
  findByShortURL(shortURL: string): Promise<IURL | null>;
  findByUserId(userId: string): Promise<IURL[]>;
  findOneByUserIdAndAlias(userId: string, alias: string): Promise<IURL | null>;
  findAll(): Promise<IURL[]>;
  findOneByShortURL(shortURL: string): Promise<IURL | null>;
  create(url: Omit<IURL, 'id' | 'createdAt'>): Promise<IURL>;
  update(id: string, updates: Partial<Omit<IURL, 'id' | 'createdAt'>>): Promise<boolean>;
  delete(id: string): Promise<boolean>;
}
