import { RequestHandler } from 'express';

export const methodNotAllowedResponder: RequestHandler<{}, { msg: string }> = (req, res, next) => {
  return res.status(405).send({ msg: 'method not allowed' });
};
