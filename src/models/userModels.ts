import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import db from '../db/connection';
import { User } from '../db/types';
import { NewUser } from '../../common/apiTypes';
import { FullUser } from '../index.d';

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

export const insertUser = async (user: NewUser): Promise<FullUser | Error> => {
  const uid = uuidv4();
  const { email, username } = user;
  try {
    await db('users').insert({ email, username, uid });
    return { ...user, uuid: uid };
  } catch (err) {
    return err;
  }
};

export const insertUserCredentials = async (user: FullUser): Promise<{ username: string } | Error> => {
  const { uuid, password, username } = user;
  try {
    const hash = bcrypt.hashSync(password, 15);
    await db('user_creds').insert({ user_id: uuid, password: hash });
    return { username };
  } catch (err) {
    return err;
  }
};
