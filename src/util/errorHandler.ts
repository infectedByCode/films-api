import { ErrorType, ErrorResponder } from '../index.d';

export const handleError = (err: ErrorType): ErrorResponder => {
  if (err.message === 'not found') {
    return { status: 404, msg: 'not found' };
  }
  if (err.message === 'invalid login') {
    return { status: 400, msg: 'username or password incorrect' };
  }
  return { status: 400, msg: 'invalid or missing data' };
};
