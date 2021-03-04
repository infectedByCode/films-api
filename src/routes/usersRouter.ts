import { getUserById, patchUserById, deleteUserById, postUser } from '../controllers/usersControllers';
import { Router } from 'express';
import { methodNotAllowedResponder, checkAuth } from '../middleware/middleware';
const usersRouter = Router();

usersRouter.route('/').post(postUser).all(methodNotAllowedResponder);

usersRouter
  .route('/:userId')
  .get(checkAuth, getUserById)
  .patch(checkAuth, patchUserById)
  .delete(checkAuth, deleteUserById)
  .all(methodNotAllowedResponder);

export default usersRouter;
