import express, { Request, Response, NextFunction, json } from 'express';

import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import apiRouter from './routes/apiRouter';
import { handleError } from './util/errorHandler';

const app = express();
dotenv.config();

app.use(json());
app.use(cors());
app.use(helmet());

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  return res.send({ msg: 'OK' });
});

app.use('/api', apiRouter);

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  return res.status(404).send({ msg: 'not found' });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const { status, msg } = handleError(err);
  return res.status(status).send({ msg });
});

export default app;
