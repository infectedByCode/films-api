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

export const insertFilm = async (filmData: RawFilm): Promise<any> => {
  const uid: string = uuidv4();
  try {
    const result = await db('films').insert({ ...filmData, uid });
    return result;
  } catch (err) {
    return err;
  }
};
