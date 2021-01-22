import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  return res.send({ msg: 'OK' });
});

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  res.status(404);
  return res.send({ msg: 'not found' });
});

export default app;
