import authRouter from './authRouter';
import filmsRouter from './filmsRouter';
import usersRouter from './usersRouter';
import { Router } from 'express';
const apiRouter = Router();

apiRouter.use('/films', filmsRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/auth', authRouter);

export default apiRouter;
