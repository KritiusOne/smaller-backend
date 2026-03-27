import { Router } from "express";
import { UserController } from "./UserController";
import { isAuthenticated } from "../middleware/Auth-middleware";

export const UserRouter = Router();
UserRouter.use(isAuthenticated);
UserRouter.get("/api/users", UserController.getAllUsers);
UserRouter.get("/api/users/:id", UserController.getUser);
UserRouter.put("/api/users/:id", UserController.updateUser);
UserRouter.delete("/api/users/:id", UserController.deleteUser);
