import { Router } from 'express';
import { methodNotAllowedResponder, checkAuth } from '../middleware/middleware';
import { getFilms, getFilmById, postFilm, patchFilmById, deleteFilmById } from '../controllers/filmsController';
const filmsRouter = Router();

filmsRouter.route('/').get(getFilms).post(postFilm).all(methodNotAllowedResponder);
filmsRouter
  .route('/:filmId')
  .get(getFilmById)
  .patch(checkAuth, patchFilmById)
  .delete(checkAuth, deleteFilmById)
  .all(methodNotAllowedResponder);

export default filmsRouter;
