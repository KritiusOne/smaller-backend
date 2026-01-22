import { Router } from 'express';
import { AuthController } from './authController';

export const AuthRouter = Router();

AuthRouter.post('/api/signup', AuthController.signUpEmailAndPassword);

AuthRouter.post('/api/verify-token', AuthController.verifyToken);

