import { RequestHandler } from 'express';
import { loginUser } from '../models/authModels';
import { UserCred } from '../../common/apiTypes';

export const postUserLogin: RequestHandler<{}, { token: string; userId: string }, { userData: UserCred }> = async (
  req,
  res,
  next
) => {
  const { userData } = req.body;
  const maybeAuthUser = await loginUser(userData);
  if (maybeAuthUser instanceof Error) {
    return next(maybeAuthUser);
  }
  return res.send({ token: maybeAuthUser.token, userId: maybeAuthUser.userId });
};
