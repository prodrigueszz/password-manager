import { Request, Response, NextFunction } from "express";
import { getUserSchema } from "../user/user.schema";
import { z } from 'zod';

export const getUserValidator = async (req: Request, res: Response, next: NextFunction) => {
  const result = await getUserSchema.safeParseAsync(req.params);
  if (!result.success) {
    const error = z.treeifyError(result.error);

    return res.status(400).json({
      status: "fail",
      data: error.properties
    })
  }

  req.params = result.data;

  next();
}