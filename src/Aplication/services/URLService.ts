import { injectable, inject } from "tsyringe";
import { DI_TOKENS } from "@src/Infraestructure/di/tokens";
import { IURLService } from "@src/Domain/services/IURLService";
import { IURLRepository } from "@src/Domain/repositories/IURLRepository";
import { generateShortURL } from "@src/helpers/getShortURL";
import { IURL } from "@src/Domain/entities/URL";
import { IUserRepository } from "@src/Domain/repositories/IUserRepository";

@injectable()
export class URLService implements IURLService {
  constructor(
    @inject(DI_TOKENS.IURLRepository) private urlRepository: IURLRepository,
    @inject(DI_TOKENS.IUserRepository) private userRepository: IUserRepository
  ) {}

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

  async createShortURL(originalURL: string, userId: string, alias?: string): Promise<IURL> {
    const user = await this.userRepository.findByFirebaseUid(userId);
    if(!user){
      throw new Error('User not found');
    }
    const existingAlias = await this.urlRepository.findOneByUserIdAndAlias(user.id, alias || '');
    if(existingAlias){
      throw new Error('Alias already in use for this user');
    }

    let shortURL = generateShortURL();
    let existingURL = await this.urlRepository.findOneByUserIdAndAlias(user.id, shortURL);
    
    let attempts = 0;
    while (existingURL && attempts < 5) {
      shortURL = generateShortURL();
      existingURL = await this.urlRepository.findOneByUserIdAndAlias(user.id, shortURL);
      attempts++;
    }

    if (existingURL) {
      throw new Error('Unable to generate unique short URL');
    }

    const newURL = await this.urlRepository.create({
      originalURL,
      shortURL,
      userId: user.id,
      alias: alias ? alias : undefined
    });
    return newURL;
  }

  async getByUserId(userId: string): Promise<IURL[]> {
    const user = await this.userRepository.findByFirebaseUid(userId);
    if(!user){
      return [];
    }
    const urls = await this.urlRepository.findByUserId(user.id);
    return urls;
  }
}