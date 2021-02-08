import { getUserById, patchUserById, deleteUserById, postUser } from '../controllers/usersControllers';
import { Router } from 'express';
import { methodNotAllowedResponder } from '../middleware/middleware';
const usersRouter = Router();

usersRouter.route('/').post(postUser);

usersRouter
  .route('/:userId')
  .get(getUserById)
  .patch(patchUserById)
  .delete(deleteUserById)
  .all(methodNotAllowedResponder);

export default usersRouter;
