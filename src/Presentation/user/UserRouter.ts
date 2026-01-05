import { Router } from "express";
import { UserController } from "./UserController";

export const UserRouter = Router();

UserRouter.get("/api/users", UserController.getAllUsers);
UserRouter.get("/api/users/:id", UserController.getUser);
UserRouter.post("/api/users", UserController.createUser);
UserRouter.put("/api/users/:id", UserController.updateUser);
UserRouter.delete("/api/users/:id", UserController.deleteUser);
