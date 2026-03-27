declare global {
  namespace Express {
    interface AuthUser {
      uid: string;
      email?: string;
    }

    interface Request {
      user?: AuthUser;
    }
  }
}

export {};