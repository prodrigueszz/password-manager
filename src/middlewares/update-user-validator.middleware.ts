import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { updateUserSchema } from '../user/user.schema';

export const updateUserValidator = async (req: Request, res: Response, next: NextFunction) => {
  const result = await updateUserSchema.safeParseAsync({
    body: req.body,
    params: req.params
  });
  
  if (!result.success) {
    const error = z.treeifyError(result.error);
    return res.status(400).json({
      status: "fail",
      data: error.properties
    });
  }

  req.body = result.data.body;
  req.params = result.data.params;

  next();
};