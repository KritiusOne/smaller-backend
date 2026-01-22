import "reflect-metadata";
import { container } from "tsyringe";
import { DI_TOKENS } from "./tokens";

// Repositorios
import { IURLRepository } from "@src/Domain/repositories/IURLRepository";
import { IUserRepository } from "@src/Domain/repositories/IUserRepository";
import { URLRepository } from "@src/Infraestructure/repositories/URLRepository";
import { UserRepository } from "@src/Infraestructure/repositories/UserRepository";

// Servicios
import { IURLService } from "@src/Domain/services/IURLService";
import { IUserService } from "@src/Domain/services/IUserService";
import { IAuthService } from "@src/Domain/services/IAuthService";
import { URLService } from "@src/Aplication/services/URLService";
import { UserService } from "@src/Aplication/services/UserService";
import { AuthService } from "@src/Aplication/services/AuthService";

// Firebase Auth
import { initializeAuth } from "@src/Infraestructure/auth";

// Registrar repositorios
container.registerSingleton<IURLRepository>(DI_TOKENS.IURLRepository, URLRepository);
container.registerSingleton<IUserRepository>(DI_TOKENS.IUserRepository, UserRepository);

// Registrar servicios
container.registerSingleton<IURLService>(DI_TOKENS.IURLService, URLService);
container.registerSingleton<IUserService>(DI_TOKENS.IUserService, UserService);
container.registerSingleton<IAuthService>(DI_TOKENS.IAuthService, AuthService);

// Registrar Firebase Auth como instancia
const firebaseAuth = initializeAuth();
container.registerInstance(DI_TOKENS.FirebaseAuth, firebaseAuth);

export { container };
