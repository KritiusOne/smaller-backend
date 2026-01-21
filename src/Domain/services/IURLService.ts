import { IURL } from "../entities/URL";

export interface IURLService {
  getURLById(id: string): Promise<string | null>;
  getAllURLs(): Promise<string[]>;
  createShortURL(originalURL: string, alias?: string): Promise<IURL>;
}