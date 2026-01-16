import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { deleteUserSchema, getUserSchema } from "../user/user.schema";

export const deleteUserValidator = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = await deleteUserSchema.safeParseAsync(req.params);

  if (!result.success) {
    const error = z.treeifyError(result.error);
    return res.status(400).json({
      status: "fail",
      data: error.properties,
    });
  }

  req.params = result.data;

  next();
};
