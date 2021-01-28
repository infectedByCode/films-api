import filmsRouter from './filmsRouter';
import usersRouter from './usersRouter';
import { Router } from 'express';
const apiRouter = Router();

apiRouter.use('/films', filmsRouter);
apiRouter.use('/users', usersRouter);

export default apiRouter;
