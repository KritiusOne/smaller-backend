import { injectable, inject } from "tsyringe";
import { DI_TOKENS } from "@src/Infraestructure/di/tokens";
import { IURLService } from "@src/Domain/services/IURLService";
import { IURLRepository } from "@src/Domain/repositories/IURLRepository";
import { generateShortURL } from "@src/helpers/getShortURL";
import { IURL } from "@src/Domain/entities/URL";

@injectable()
export class URLService implements IURLService {
  constructor(@inject(DI_TOKENS.IURLRepository) private urlRepository: IURLRepository) {}

  async getAllURLs(): Promise<string[]> {
    const urls = await this.urlRepository.findAll();
    return urls.map(url => url.shortURL);
  }

  async getURLById(id: string): Promise<string | null> {
    const url = await this.urlRepository.findById(id);
    if (!url) {
      return null;
    }
    return url.originalURL;
  }

  async createShortURL(originalURL: string, alias?: string): Promise<IURL> {
    let shortURL = generateShortURL();
    let existingURL = await this.urlRepository.findByShortURL(shortURL);
    
    let attempts = 0;
    while (existingURL && attempts < 5) {
      shortURL = generateShortURL();
      existingURL = await this.urlRepository.findByShortURL(shortURL);
      attempts++;
    }

    if (existingURL) {
      throw new Error('Unable to generate unique short URL');
    }

    const newURL = await this.urlRepository.create({
      originalURL,
      shortURL,
      userId: "temporary-user-id", // TODO: Replace with actual user ID from auth
      alias: alias
    });

    return newURL;
  }
}