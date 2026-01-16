import { Router } from 'express';
import { PrismaUserRepository } from '../user/user.prisma-repository';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { prisma } from '../db/prisma.instance';

const authRouter = Router();

const userRepository = new PrismaUserRepository(prisma);
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

authRouter.post('/v1/login', authController.handleLogin.bind(authController));

export default authRouter;
