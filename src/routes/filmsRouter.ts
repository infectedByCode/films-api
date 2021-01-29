import { Router } from 'express';
import { getFilms, getFilmById, postFilm, patchFilmById, deleteFilmById } from '../controllers/filmsController';
const filmsRouter = Router();

filmsRouter.route('/').get(getFilms).post(postFilm);
filmsRouter.route('/:filmId').get(getFilmById).patch(patchFilmById).delete(deleteFilmById);

export default filmsRouter;
