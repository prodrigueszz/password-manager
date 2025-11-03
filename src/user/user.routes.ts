import { Request, Response, Router } from 'express';
const userRouter = Router();

userRouter.get('/users', async (req: Request, res: Response) => {
  res.status(500).json({
    message: "Deu merda parceiro"
  })
})

export default userRouter;