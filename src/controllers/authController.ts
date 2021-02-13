import { RequestHandler } from 'express';
import { loginUser } from '../models/authModels';
import { UserCred } from '../../common/apiTypes';

export const postUserLogin: RequestHandler<{}, { token: string }, { userData: UserCred }> = async (req, res, next) => {
  const { userData } = req.body;
  const maybeToken = await loginUser(userData);
  if (maybeToken instanceof Error) {
    return next(maybeToken);
  }
  return res.send({ token: maybeToken.token });
};
