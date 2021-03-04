import { Router } from 'express';
import { methodNotAllowedResponder, checkAuth } from '../middleware/middleware';
import {
  getFilms,
  getFilmById,
  postFilm,
  patchFilmById,
  deleteFilmById,
  getFilmsByUserId,
  postFilmIdByUserId,
} from '../controllers/filmsController';
const filmsRouter = Router();

filmsRouter.route('/').get(getFilms).post(checkAuth, postFilm).all(methodNotAllowedResponder);
filmsRouter
  .route('/:filmId')
  .get(getFilmById)
  .patch(checkAuth, patchFilmById)
  .delete(checkAuth, deleteFilmById)
  .all(methodNotAllowedResponder);
filmsRouter
  .route('/users/:userId')
  .get(checkAuth, getFilmsByUserId)
  .post(checkAuth, postFilmIdByUserId)
  .all(methodNotAllowedResponder);

export default filmsRouter;
