/**
 * Tokens de inyección de dependencias
 * Usar estos tokens en lugar de strings mágicos para evitar errores de tipeo
 * y facilitar el refactoring
 */

export const DI_TOKENS = {
  // Repositories
  IURLRepository: Symbol.for("IURLRepository"),
  IUserRepository: Symbol.for("IUserRepository"),
  
  // Services
  IURLService: Symbol.for("IURLService"),
  IUserService: Symbol.for("IUserService"),
  IAuthService: Symbol.for("IAuthService"),
  
  // Firebase
  FirebaseAuth: Symbol.for("FirebaseAuth"),
} as const;
