import { Request, Response } from "express";
import { createUserScheme, getUserScheme, updateUserScheme } from "./UserSchemes";
import { container } from "@src/Infraestructure/di/container";
import { DI_TOKENS } from "@src/Infraestructure/di/tokens";
import { IUserService } from "@src/Domain/services/IUserService";

const userService = container.resolve<IUserService>(DI_TOKENS.IUserService);

async function getUser(req: Request, res: Response) {
  const { id } = req.params;
  const parsed = getUserScheme.safeParse({ id });
  
  if (!parsed.success) {
    res.status(400).json({
      error: "Invalid user id",
      details: parsed.error
    });
    return;
  }

  try {
    const user = await userService.getUserById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error getting user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function getAllUsers(req: Request, res: Response) {
  try {
    const users = await userService.getAllUsers();
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error getting users:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function updateUser(req: Request, res: Response) {
  const { id } = req.params;
  const { name, email } = req.body;

  const idParsed = getUserScheme.safeParse({ id });
  if (!idParsed.success) {
    res.status(400).json({
      error: "Invalid user id",
      details: idParsed.error
    });
    return;
  }

  const dataParsed = updateUserScheme.safeParse({ name, email });
  if (!dataParsed.success) {
    res.status(400).json({
      error: "Invalid input",
      details: dataParsed.error
    });
    return;
  }

  try {
    const user = await userService.updateUser(id, dataParsed.data);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    if (error instanceof Error && error.message === 'Email already exists') {
      res.status(409).json({ error: error.message });
      return;
    }
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function deleteUser(req: Request, res: Response) {
  const { id } = req.params;
  const parsed = getUserScheme.safeParse({ id });

  if (!parsed.success) {
    res.status(400).json({
      error: "Invalid user id",
      details: parsed.error
    });
    return;
  }

  try {
    const deleted = await userService.deleteUser(id);
    if (!deleted) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export const UserController = {
  getUser,
  getAllUsers,
  updateUser,
  deleteUser
};
