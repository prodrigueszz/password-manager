import { NextFunction, Request, Response } from 'express';

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', error);

  if (error.name === 'PrismaClientKnownRequestError') {
    return res.status(400).json({
      status: 'fail',
      message: 'Erro de banco de dados',
    });
  }

  if (error.name === 'ValidationError') {
    return res.status(400).json({
      status: 'fail',
      message: 'Dados de entrada inválidos',
    });
  }

  res.status(500).json({
    status: 'error',
    message: process.env.NODE_ENV === 'development' 
      ? error.message 
      : 'Erro interno do servidor',
  });
};