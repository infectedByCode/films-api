import filmsRouter from './filmsRouter';
import { Router } from 'express';
const apiRouter = Router();

apiRouter.use('/films', filmsRouter);

export default apiRouter;
