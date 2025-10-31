import express from 'express';
import 'dotenv/config'

const app = express();

const port = 3000;
app.listen(port, () => {
  console.log(`Server listenning on port ${port}`)
});
