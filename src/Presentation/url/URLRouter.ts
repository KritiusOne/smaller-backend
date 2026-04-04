import { Router } from "express";
import { URLController } from "./URLController";
import { isAuthenticated } from "../middleware/Auth-middleware";

export const URLRouter = Router();
URLRouter.get("/api/urls/short/:shortURL", URLController.getURLbyShortURL);
URLRouter.use(isAuthenticated);
URLRouter.get("/api/urls/:id", URLController.getUrl);
URLRouter.post("/api/urls", URLController.createShortURL);
URLRouter.get("/api/urls/user/:userId", URLController.getAllURLsByUser);