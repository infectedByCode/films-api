import db from '../db/connection';
import { Film } from '../db/types';

export const selectFilms = async (): Promise<Film[]> => {
  const films = await db('films').select('*');
  return films;
};
