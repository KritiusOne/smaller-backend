import { container } from "@src/Infraestructure/di/container";
import { DI_TOKENS } from "@src/Infraestructure/di/tokens";
import { NextFunction, Request, Response } from "express";

const auth = container.resolve<any>(DI_TOKENS.FirebaseAuth);

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