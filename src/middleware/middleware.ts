import { RequestHandler, Response } from 'express';
import jwt from 'jsonwebtoken';

export const methodNotAllowedResponder: RequestHandler<{}, { msg: string }> = (req, res, next) => {
  return res.status(405).send({ msg: 'method not allowed' });
};

export const checkAuth: RequestHandler = async (req, res, next): Promise<Response | void> => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization;
      jwt.verify(token, 'secret');
      return next();
    }
    return res.status(403).send({ auth: false, msg: 'no token provided' });
  } catch (err) {
    return res.status(401).send({ auth: false, msg: 'failed to authenticate' });
  }
};
