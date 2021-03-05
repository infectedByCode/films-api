import { RequestHandler } from 'express';
import {
  selectFilms,
  selectFilmById,
  insertFilm,
  updateFilmById,
  removeFilmById,
  fetchFilmsByUserId,
  insertFilmIdByUserId,
  removeFilmByUserId,
} from '../models/filmModels';
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

export const postFilm: RequestHandler<{}, {}, RawFilm> = async (req, res, next) => {
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
  if (result instanceof Error) {
    return next(result);
  }
  // result is affected rows - if === 0 then not found
  if (result === 0) {
    return next(Error('not found'));
  }
  return res.send({ msg: `${filmId} updated` });
};

export const deleteFilmById: RequestHandler<{ filmId: string }, {}> = async (req, res, next) => {
  const { filmId } = req.params;
  const result = await removeFilmById(filmId);
  if (result === 0) {
    return next(Error('not found'));
  }
  return res.sendStatus(204);
};

export const getFilmsByUserId: RequestHandler<{ userId: string }, { userId: string; films: Film[] }> = async (
  req,
  res,
  next
) => {
  const { userId } = req.params;
  const films = await fetchFilmsByUserId(userId);
  return res.send({ userId, films });
};

export const postFilmIdByUserId: RequestHandler<{ userId: string }, {}, { filmId: string }> = async (
  req,
  res,
  next
) => {
  const { userId } = req.params;
  const { filmId } = req.body;
  await insertFilmIdByUserId(userId, filmId);
  return res.sendStatus(201);
};

export const deleteFilmByUserId: RequestHandler<{ filmId: string; userId: string }> = async (req, res, next) => {
  const { userId, filmId } = req.params;
  const result = await removeFilmByUserId(userId, filmId);
  if (result === 0) {
    return next(Error('not found'));
  }
  return res.sendStatus(204);
};
