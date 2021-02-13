import express, { Request, Response, NextFunction, json, ErrorRequestHandler } from 'express';
import dotenv from 'dotenv';
import apiRouter from './routes/apiRouter';

const app = express();
dotenv.config();
app.use(json());

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  return res.send({ msg: 'OK' });
});

app.use('/api', apiRouter);

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  return res.status(404).send({ msg: 'not found' });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  // TODO: create error util function
  if (err.message === 'not found') {
    return res.status(404).send({ msg: err.message });
  }
  if (err.message === 'invalid login') {
    return res.status(400).send({ msg: 'username or password incorrect' });
  }
  return res.status(400).send({ msg: 'invalid or missing data' });
});

export default app;
