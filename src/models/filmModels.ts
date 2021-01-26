import db from '../db/connection';
import { Film } from '../db/types';

export const selectFilms = async (): Promise<Film[]> => {
  const films = await db('films').select('*');
  return films;
};

export const selectFilmById = async (filmId: string): Promise<Film> => {
  const film = await db('films').first('*').where('uid', filmId);
  return film;
};
