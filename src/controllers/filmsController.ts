import { RequestHandler } from 'express';
import { selectFilms, selectFilmById, insertFilm, updateFilmById } from '../models/filmModels';
import { Film, RawFilm } from '../../common/apiTypes';

export const getFilms: RequestHandler<{}, { films: Film[] }> = async (req, res, next) => {
  const films = await selectFilms();
  return res.send({ films });
};

export const getFilmById: RequestHandler<{ filmId: string }, { film: Film } | { msg: string }> = async (
  req,
  res,
  next
) => {
  const { filmId } = req.params;
  const film = await selectFilmById(filmId);
  if (film == null) {
    return res.status(404).send({ msg: `filmId - ${filmId} - not matched` });
  }
  return res.send({ film });
};

export const postFilm: RequestHandler<{ filmData: RawFilm }, {}> = async (req, res, next) => {
  const filmData = req.body;
  const result = await insertFilm(filmData);
  if (result instanceof Error) {
    return next(result);
  }
  return res.sendStatus(201);
};

export const patchFilmById: RequestHandler<
  { filmId: string },
  { msg: string },
  { filmData: Partial<RawFilm> }
> = async (req, res, next) => {
  const { filmId } = req.params;
  const { filmData } = req.body;
  const result = await updateFilmById(filmId, filmData);
  return res.send({ msg: `${filmId} updated` });
};
