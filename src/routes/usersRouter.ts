import { getUserById, patchUserById, deleteUserById } from '../controllers/usersControllers';
import { Router } from 'express';
import { methodNotAllowedResponder } from '../middleware/middleware';
const usersRouter = Router();

usersRouter
  .route('/:userId')
  .get(getUserById)
  .patch(patchUserById)
  .delete(deleteUserById)
  .all(methodNotAllowedResponder);

export default usersRouter;
