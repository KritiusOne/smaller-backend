import { IURL } from "../entities/URL";

export interface IURLRepository {
  findById(id: string): Promise<IURL | null>;
  findByShortURL(shortURL: string): Promise<IURL | null>;
  findByUserId(userId: string): Promise<IURL[]>;
  findAll(): Promise<IURL[]>;
  create(url: Omit<IURL, 'id' | 'createdAt'>): Promise<IURL>;
  delete(id: string): Promise<boolean>;
}
