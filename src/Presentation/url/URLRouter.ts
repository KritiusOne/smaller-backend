import { Router } from "express";
import { URLController } from "./URLController";

export const URLRouter = Router();

URLRouter.get("/api/urls/:id", URLController.getUrl);
URLRouter.post("/api/urls", URLController.createShortURL);