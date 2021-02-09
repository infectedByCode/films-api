import bcrypt from 'bcrypt';
import db from '../db/connection';
import { User, UserCredentials } from '../db/types';

export const loginUser = async (userData: { username: string; email: string; password: string }): Promise<any> => {
  const { username, email, password } = userData;
  const user = await db('users').first('uid').where('username', username).orWhere('email', email);
  if (!user?.uid) {
    return new Error('not found');
  }
  try {
    const hash = bcrypt.hashSync(password, 15);
    const userDetails = await db('user_creds')
      .first('user_id', 'password')
      .where('user_id', user?.uid)
      .andWhere('password', hash);
    if (!userDetails) {
      return new Error('to handle');
    }
    const match = await bcrypt.compare(password, userDetails.password);
    if (match) {
      // TODO: add jwt
      return { token: 'a token' };
    }
  } catch (err) {
    return err;
  }
};
