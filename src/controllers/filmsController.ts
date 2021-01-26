import { RequestHandler } from 'express';
import { selectFilms, selectFilmById } from '../models/filmModels';
import { Film } from '../../common/apiTypes';

export const getFilms: RequestHandler<{}, { films: Film[] }> = async (req, res, next) => {
  const films = await selectFilms();
  return res.send({ films });
};

export const getFilmById: RequestHandler<{ filmId: string }, { film: Film }> = async (req, res, next) => {
  const { filmId } = req.params;
  const film = await selectFilmById(filmId);
  return res.send({ film });
};
