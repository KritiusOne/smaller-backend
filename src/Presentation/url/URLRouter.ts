import { Router } from "express";
import { URLController } from "./URLController";

export const URLRouter = Router();

URLRouter.get("/:id", URLController.getUrl);
URLRouter.post("/", URLController.createShortURL);