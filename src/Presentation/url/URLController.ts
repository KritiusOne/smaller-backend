import { Request, Response } from "express";
import { createURLScheme, getAllURLsByUserScheme, getURLScheme } from "./URLSchemes";
import { container } from "@src/Infraestructure/di/container";
import { DI_TOKENS } from "@src/Infraestructure/di/tokens";
import { IURLService } from "@src/Domain/services/IURLService";

const urlService = container.resolve<IURLService>(DI_TOKENS.IURLService);

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
  if(req.user){
    console.log(req.user)
  }
  const parsed = createURLScheme.safeParse({ originalURL, alias });
  if(!parsed.success){
    res.status(400).json({
      error: "Invalid input",
      details: parsed.error
    });
    return;
  }
  try {
    const shortURL = await urlService.createShortURL(originalURL,req.user.uid, alias);
    res.status(201).json({ shortURL });
  } catch (error) {
    console.error("Error creating short URL:", error);
    res.status(500).json({ error: "Internal server error" });
  }
  
}

async function getAllURLsByUser(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const parsed = getAllURLsByUserScheme.safeParse({ userId });
    if (!parsed.success) {
      res.status(400).json({
        error: "Invalid user ID",
        details: parsed.error
      });
      return;
    }
    const urls = await urlService.getByUserId(userId);
    res.status(200).json({ urls });
  } catch (error) {
    console.error("Error fetching URLs:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
export const URLController = {
  getUrl,
  createShortURL,
  getAllURLsByUser
};