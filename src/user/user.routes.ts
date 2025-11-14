import express, { Router, Request, Response } from 'express';
import { UserController } from './user.controller';
import { prisma } from '../db/prisma.instance';
import { UserService } from './user.service';
import { PrismaUserRepository } from './user.prisma-repository';
import { createUserValidator } from '../middlewares/create-user-validator.middleware'
import { getUserValidator } from '../middlewares/get-user-validator.middleware';
import { updateUserValidator } from '../middlewares/update-user-validator.middleware';
import { deleteUserValidator } from '../middlewares/delete-user-validator.middleware';

const userRouter = Router();
userRouter.use(express.json());

const userRepository = new PrismaUserRepository(prisma);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

userRouter.get('/v1/users', userController.getAllUsers.bind(userController));
userRouter.get('/v1/users/:id', getUserValidator, userController.findUser.bind(userController));
userRouter.post('/v1/users', createUserValidator, userController.createNewUser.bind(userController));
userRouter.put('/v1/users/:id', updateUserValidator, userController.updateUser.bind(userController));
userRouter.delete('/v1/users/:id', deleteUserValidator, userController.deleteUser.bind(userController));

export default userRouter;