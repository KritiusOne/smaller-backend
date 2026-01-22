import { Request, Response } from 'express';
import { SignUpSchema } from './AuthScheme';
import { container } from "@src/Infraestructure/di/container";
import { DI_TOKENS } from "@src/Infraestructure/di/tokens";
import { IAuthService } from '@src/Domain/services/IAuthService';

const AuthService = container.resolve<IAuthService>(DI_TOKENS.IAuthService);

async function signUpEmailAndPassword(req: Request, res: Response) {
  try {
    const validatedData = SignUpSchema.safeParse(req.body);
    if (!validatedData.success) {
      return res.status(400).json({ error: 'Invalid data', details: validatedData.error.message });
    }

    const { email, password, displayName } = validatedData.data;

    const result = await AuthService.signUpEmailAndPassword(email, password, displayName);
    
    res.status(201).json({
      message: 'user created successfully',
      user: { uid: result.uid, email: result.email, displayName: result.displayName },
      customToken: result.customToken
    });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ error: 'Invalid data', details: error.errors });
    }
    
    if (error.code === 'auth/email-already-exists') {
      return res.status(400).json({ error: 'Email already registered' });
    }
    
    console.error('Error en signUp:', error);
    res.status(500).json({ error: 'Error al crear usuario' });
  }
}



async function verifyToken(req: Request, res: Response) {
  try {
    const token = req.headers.authorization?.split('Bearer ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'Token not provided' });
    }

    const user = await AuthService.verifyToken(token);
    
    res.status(200).json({
      message: 'Token is valid',
      user: { uid: user.uid, email: user.email, name: user.name }
    });
  } catch (error: any) {
    if (error.code === 'auth/id-token-expired') {
      return res.status(401).json({ error: 'Token expired' });
    }
    
    if (error.code === 'auth/argument-error' || error.code === 'auth/invalid-id-token') {
      return res.status(401).json({ error: 'Invalid token' });
    }

    if (error.message === 'User not found in database') {
      return res.status(404).json({ error: 'User not found in database' });
    }
    
    console.error('Error verifying token:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
}

export const AuthController = {
  signUpEmailAndPassword,
  verifyToken,
}