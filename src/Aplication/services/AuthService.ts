import { inject, injectable } from "tsyringe";
import admin from "firebase-admin";
import { IAuthService } from "@src/Domain/services/IAuthService";
import { DI_TOKENS } from "@src/Infraestructure/di/tokens";
import { IUserService } from "@src/Domain/services/IUserService";
import { config } from "@src/Infraestructure/config";

@injectable()
export class AuthService implements IAuthService {
  constructor(@inject(DI_TOKENS.IUserService) private userService: IUserService, @inject(DI_TOKENS.FirebaseAuth) private firebaseAuth: admin.auth.Auth) { }

  static initialize(): admin.app.App {
    if (admin.apps.length > 0) {
      return admin.app();
    }
    if (config.firebase.firebaseAdminConfigRaw.private_key) {
      config.firebase.firebaseAdminConfigRaw.private_key = config.firebase.firebaseAdminConfigRaw.private_key.replace(/\\n/g, "\n");
    }


    return admin.initializeApp({
      credential: admin.credential.cert(config.firebase.firebaseAdminConfigRaw)
    })
  }

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
      const decodedToken = await this.firebaseAuth.verifyIdToken(token);

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
      throw error;
    }
  }

}