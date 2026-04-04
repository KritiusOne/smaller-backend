import { IURL } from "../entities/URL";

export interface IURLService {
  getURLById(id: string): Promise<string | null>;
  getAllURLs(): Promise<string[]>;
  createShortURL(originalURL: string, userId: string, alias?: string): Promise<IURL>;
  getByUserId(userId: string): Promise<IURL[]>;
  getByShortURL(shortURL: string, viewCount?: boolean): Promise<IURL | null>;
}