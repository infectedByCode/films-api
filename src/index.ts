import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import { db } from './db/db';
const app = express();
dotenv.config();

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  if (req.url === '/') return res.send({ msg: 'hello' });
  else next();
});

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  res.status(404);
  return res.send({ msg: 'not found' });
});

app.listen(process.env.PORT, () => {
  process.stdout.write(`Server running on ${process.env.PORT}`);
});
