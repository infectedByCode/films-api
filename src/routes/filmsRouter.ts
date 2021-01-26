import { Router } from 'express';
import { getFilms, getFilmById } from '../controllers/filmsController';
const filmsRouter = Router();

filmsRouter.get('/', getFilms);
filmsRouter.get('/:filmId', getFilmById);

export default filmsRouter;
