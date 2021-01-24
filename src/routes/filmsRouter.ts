import { Router } from 'express';
import { getFilms } from '../controllers/filmsController';
const filmsRouter = Router();

filmsRouter.get('/', getFilms);

export default filmsRouter;
