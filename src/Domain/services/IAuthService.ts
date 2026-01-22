export interface IAuthService {
  signUpEmailAndPassword(email: string, password: string, displayName?: string): Promise<{ uid: string; email: string; displayName?: string; customToken: string }>;  
  verifyToken(token: string): Promise<{ uid: string; email: string; name: string; }>;
}