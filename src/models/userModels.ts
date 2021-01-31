import db from '../db/connection';
import { User } from '../db/types';

export const selectUserById = async (userId: string): Promise<User> => {
  const user = await db('users').first('*').where('uid', userId);
  return user;
};

export const updateUserById = async (userId: string, email: string): Promise<number | Error> => {
  try {
    const result = await db('users').update({ email }).where('uid', userId);
    return result;
  } catch (err) {
    return err;
  }
};

export const removeUserById = async (userId: string): Promise<number | Error> => {
  const result = await db('users').delete().where('uid', userId);
  return result;
};
