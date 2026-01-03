import { IURLService } from "@src/Domain/services/IURLService";
import { generateShortURL } from "@src/helpers/getShortURL";
import { URLModel } from "@src/Infraestructure/db/schemes/URLScheme";

export class URLService implements IURLService{
  async getAllURLs(): Promise<string[]> {
    const urlArr = await URLModel.find();
    urlArr.map(url => {
      console.log(url);
    })
    return [];
  }
  async getURLById(id: string): Promise<string | null> {
    const url = await URLModel.findOne({
      id: id
    })
    if(!url){
      return null;
    }
    return url.originalURL;
  }
  async createShortURL(originalURL: string, alias?: string): Promise<string> {
    const newURL = await URLModel.create({
      createdAt: new Date(),
      alias: alias ? alias : '',
      originalURL: originalURL,
      shortURL: generateShortURL(),
      userId: "dasfasdf", // TODO: Implement user management
      id: "sfsfs" // TODO: Implement ID generation
    })
    const res = await newURL.save();
    if(!res){
      throw new Error('Error creating short URL'); // TODO: Global error handling
    }
    return newURL.shortURL;
  }

}