import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { createUserSchema } from '../user/user.schema';

export const createUserValidator = async (req: Request, res: Response, next: NextFunction) => {
  const result = await createUserSchema.safeParseAsync(req.body);
  if (!result.success) {
    const error = z.treeifyError(result.error);
    return res.status(400).json({
      status: "fail",
      data: error.properties
    })
  }

  req.body = result.data;

  next();
}