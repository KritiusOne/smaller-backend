import { Request, Response } from "express";
import { createURLScheme, getURLScheme } from "./URLSchemes";
import { URLService } from "@src/Aplication/services/URLService";
import { URLRepository } from "@src/Infraestructure/repositories/URLRepository";

const urlRepository = new URLRepository();
const urlService = new URLService(urlRepository);

async function getUrl(req: Request, res: Response){
  const { id } = req.params;
  const parsed = getURLScheme.safeParse({ id });
  if(!parsed.success){
    res.status(400).json({
      error: "Invalid URL id",
      details: parsed.error
    });
    return;
  }
  const shortURL = await urlService.getURLById(id);
  if(!shortURL){
    res.status(404).json({ error: "URL not found" });
    return;
  }
  res.status(200).json({ shortURL });
}

async function createShortURL(req: Request, res: Response){
  const { originalURL, alias } = req.body;

  const parsed = createURLScheme.safeParse({ originalURL, alias });
  if(!parsed.success){
    res.status(400).json({
      error: "Invalid input",
      details: parsed.error
    });
    return;
  }
  try {
    const shortURL = await urlService.createShortURL(originalURL, alias);
    res.status(201).json({ shortURL });
  } catch (error) {
    console.error("Error creating short URL:", error);
    res.status(500).json({ error: "Internal server error" });
  }
  
}

export const URLController = {
  getUrl,
  createShortURL
};