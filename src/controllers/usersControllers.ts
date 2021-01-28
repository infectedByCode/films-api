import { RequestHandler } from 'express';
import { selectUserById } from '../models/userModels';
import { User } from '../../common/apiTypes';

export const getUserById: RequestHandler<{ userId: string }, { user: User }> = async (req, res, next) => {
  const { userId } = req.params;
  const user = await selectUserById(userId);
  return res.send({ user });
};
