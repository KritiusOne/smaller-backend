import { NextFunction, Request, Response } from "express";
import { initializeAuth } from "@src/Infraestructure/auth";

const auth = initializeAuth();

export const isAuthenticated = async(req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1] || '';
  if(!token || token === ""){
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const decodedToken = await auth.verifyIdToken(token);
    (req as any).user = { uid: decodedToken.uid, email: decodedToken.email };
    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized" });
  }
}