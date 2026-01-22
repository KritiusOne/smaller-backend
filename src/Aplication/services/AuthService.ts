import { inject, injectable } from "tsyringe";
import admin from "firebase-admin";
import { IAuthService } from "@src/Domain/services/IAuthService";
import { DI_TOKENS } from "@src/Infraestructure/di/tokens";
import { IUserService } from "@src/Domain/services/IUserService";

@injectable()
export class AuthService implements IAuthService {
  constructor(@inject(DI_TOKENS.IUserService) private userService: IUserService, @inject(DI_TOKENS.FirebaseAuth) private firebaseAuth: admin.auth.Auth) {}
  
  async signUpEmailAndPassword(email: string, password: string, displayName?: string): Promise<{ uid: string; email: string; displayName?: string; customToken: string; }> {
    try {
      const userRecord = await this.firebaseAuth.createUser({
        email,
        password,
        displayName
      })

      const BBDDUser = await this.userService.createUser(displayName || 'No Name', email, userRecord.uid);

      const customToken = await this.firebaseAuth.createCustomToken(userRecord.uid);

      return {
        uid: userRecord.uid,
        email: BBDDUser.email,
        displayName: BBDDUser.name,
        customToken
      }

    } catch (error) {
      console.log('Error in signUpEmailAndPassword:', error);
      throw error;
    }
  }

  async verifyToken(token: string): Promise<{ uid: string; email: string; name: string; }> {
    try {
      // 1. Verify token with Firebase Admin
      const decodedToken = await this.firebaseAuth.verifyIdToken(token);

      // 2. Get user from database using Firebase UID
      const user = await this.userService.getUserByFirebaseUid(decodedToken.uid);

      if (!user) {
        throw new Error('User not found in database');
      }

      return {
        uid: user.firebaseUid,
        email: user.email,
        name: user.name
      };
    } catch (error: any) {
      console.log('Error in verifyToken:', error);
      throw error;
    }
  }

}