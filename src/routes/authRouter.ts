import { Router } from 'express';
import { methodNotAllowedResponder } from '../middleware/middleware';
import { postUserLogin } from '../controllers/authController';
const authRouter = Router();

authRouter.route('/login').post(postUserLogin).all(methodNotAllowedResponder);

export default authRouter;
