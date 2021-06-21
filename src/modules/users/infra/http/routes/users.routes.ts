import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import UsersController from '../controllers/UsersController';
import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated';
import UserValidations from '../../../utils/UserValidations';
import UserAvatarController from '../controllers/UserAvatarController';

const usersRouter = Router();
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();
const validations = new UserValidations();

const upload = multer(uploadConfig.multer);

usersRouter.get('/', isAuthenticated, usersController.index);
usersRouter.get('/:id', validations.showValidation, usersController.show);
usersRouter.post('/', validations.createValidation, usersController.create);
// TODO: update
usersRouter.patch(
  '/avatar/',
  isAuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
);
usersRouter.delete(
  '/:id',
  validations.deleteValidation,
  usersController.delete,
);

export default usersRouter;
