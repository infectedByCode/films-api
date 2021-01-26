import { Router } from 'express';
import { getFilms, getFilmById, postFilm } from '../controllers/filmsController';
const filmsRouter = Router();

filmsRouter.route('/').get(getFilms).post(postFilm);
filmsRouter.get('/:filmId', getFilmById);

export default filmsRouter;
