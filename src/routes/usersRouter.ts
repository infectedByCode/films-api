import { getUserById, patchUserById, deleteUserById } from '../controllers/usersControllers';
import { Router } from 'express';
const usersRouter = Router();

usersRouter.route('/:userId').get(getUserById).patch(patchUserById).delete(deleteUserById);

export default usersRouter;
