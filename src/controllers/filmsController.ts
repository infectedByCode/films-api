import { RequestHandler } from 'express';
import { selectFilms } from '../models/filmModels';

export const getFilms: RequestHandler<{}, {}> = async (req, res, next) => {
  await selectFilms();
};
