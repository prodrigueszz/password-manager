import express, { Request, Response } from 'express';
import 'dotenv/config'
import userRouter from './user/user.routes';

const app = express();

app.use(express.json());
app.use('/', userRouter); 

const port = 3000;
app.listen(port, () => {
  console.log(`Server listenning on port ${port}`)
});
