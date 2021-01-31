import { getUserById, patchUserById } from '../controllers/usersControllers';
import { Router } from 'express';
const usersRouter = Router();

usersRouter.route('/:userId').get(getUserById).patch(patchUserById);

export default usersRouter;
