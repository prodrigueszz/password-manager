import express, { Request, Response } from 'express';
import 'dotenv/config'
import userRouter from './user/user.routes';
import { errorHandler } from './middlewares/error-handler.middleware';
import { notFoundHandler } from './middlewares/not-found.middleware';
import authRouter from './auth/auth.routes';
import secretRouter from './secrets/secret.routes';

const app = express();

app.use(express.json());

app.use('/api', userRouter); 
app.use('/api', authRouter);
app.use('/api', secretRouter);

app.use(notFoundHandler);
app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
});
