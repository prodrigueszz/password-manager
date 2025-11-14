import express from 'express';
import 'dotenv/config'
import userRouter from './user/user.routes';
import { errorHandler } from './middlewares/error-handler.middleware';
import { notFoundHandler } from './middlewares/not-found.middleware';

const app = express();

app.use(express.json());

app.use('/api', userRouter); 

app.use(notFoundHandler);
app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
});
