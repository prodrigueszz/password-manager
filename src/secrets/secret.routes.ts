import { Router } from "express";
import { SecretPrismaRepository } from "./secret.prisma-repository";
import { prisma } from "../db/prisma.instance";
import { SecretService } from "./secret.service";
import { SecretController } from "./secret.controller";
import { UserService } from "../user/user.service";
import { PrismaUserRepository } from "../user/user.prisma-repository";

const secretRouter = Router();

const secretRepository = new SecretPrismaRepository(prisma);
const secretService = new SecretService(secretRepository);

const userRepository = new PrismaUserRepository(prisma);
const userService = new UserService(userRepository);

const secretController = new SecretController(secretService, userService);

secretRouter.get(
  "/v1/secrets/:ownerId",
  secretController.findSecret.bind(secretController)
);
secretRouter.post(
  "/v1/secrets/:ownerId",
  secretController.createSecret.bind(secretController)
);
secretRouter.put(
  "/v1/secrets/:ownerId",
  secretController.updateSecret.bind(secretController)
);
secretRouter.delete(
  "/v1/secrets/:ownerId",
  secretController.deleteSecret.bind(secretController)
);

export default secretRouter;