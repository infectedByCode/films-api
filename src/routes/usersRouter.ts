import { getUserById } from '../controllers/usersControllers';
import { Router } from 'express';
const usersRouter = Router();

usersRouter.get('/:userId', getUserById);

export default usersRouter;
