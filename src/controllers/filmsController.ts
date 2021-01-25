import { RequestHandler } from 'express';
import { selectFilms } from '../models/filmModels';
import { Films } from '../../common/apiTypes';

export const getFilms: RequestHandler<{}, { films: Films[] }> = async (req, res, next) => {
  const films = await selectFilms();
  return res.send({ films });
};
