import bcrypt from 'bcrypt';
import db from '../db/connection';
import jwt from 'jsonwebtoken';

export const loginUser = async (userData: { username: string; email: string; password: string }): Promise<any> => {
  const { username, email, password } = userData;
  const user = await db('users').first('uid').where('username', username).orWhere('email', email);
  if (!user?.uid) {
    return new Error('not found');
  }
  try {
    const userDetails = await db('user_creds').first().where('user_id', user?.uid);
    if (userDetails) {
      const match = await bcrypt.compare(password, userDetails.password);
      if (match) {
        const token = jwt.sign({ userId: user.uid }, 'secret', { expiresIn: '60m' });
        return { token };
      }
      return new Error('invalid login');
    }
  } catch (err) {
    return err;
  }
};
