import { v4 as uuidv4 } from 'uuid';
import db from '../db/connection';
import { Film } from '../db/types';
import { RawFilm } from '../../common/apiTypes';

export const selectFilms = async (): Promise<Film[]> => {
  const films = await db('films').select('*');
  return films;
};

export const selectFilmById = async (filmId: string): Promise<Film> => {
  const film = await db('films').first('*').where('uid', filmId);
  return film;
};

export const insertFilm = async (filmData: RawFilm): Promise<number[] | Error> => {
  const uid: string = uuidv4();
  try {
    const result = await db('films').insert({ ...filmData, uid });
    return result;
  } catch (err) {
    return err;
  }
};

export const updateFilmById = async (filmId: string, filmData: Partial<RawFilm>): Promise<number | Error> => {
  try {
    const result = await db('films')
      .update({ ...filmData })
      .where('uid', filmId);
    return result;
  } catch (err) {
    return err;
  }
};

export const removeFilmById = async (filmId: string): Promise<number> => {
  const result = await db('films').delete().where('uid', filmId);
  return result;
};
