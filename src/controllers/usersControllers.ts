import { RequestHandler } from 'express';
import { selectUserById, updateUserById, removeUserById } from '../models/userModels';
import { User } from '../../common/apiTypes';

export const getUserById: RequestHandler<{ userId: string }, { user: User }> = async (req, res, next) => {
  const { userId } = req.params;
  const user = await selectUserById(userId);
  if (!user) {
    return next(Error('not found'));
  }
  return res.send({ user });
};

export const patchUserById: RequestHandler<{ userId: string }, { msg: string }, { email: string }> = async (
  req,
  res,
  next
) => {
  const { userId } = req.params;
  const { email } = req.body;
  const result = await updateUserById(userId, email);
  if (result instanceof Error) {
    return next(result);
  }
  if (result === 0) {
    return next(Error('not found'));
  }
  return res.send({ msg: `${userId} updated` });
};

export const deleteUserById: RequestHandler<{ userId: string }, {}> = async (req, res, next) => {
  const { userId } = req.params;
  const result = await removeUserById(userId);
  if (result === 0) {
    return next(Error('not found'));
  }
  return res.sendStatus(204);
};
