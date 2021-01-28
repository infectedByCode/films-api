import db from '../db/connection';
import { User } from '../db/types';

export const selectUserById = async (userId: string): Promise<User> => {
  const user = await db('users').first('*').where('uid', userId);
  return user;
};
