import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import UserValidations from '../utils/UserValidations';

const usersRouter = Router();
const usersController = new UsersController();
const validations = new UserValidations();

usersRouter.get('/', usersController.index);
usersRouter.get('/:id', validations.showValidation, usersController.show);
usersRouter.post('/', validations.createValidation, usersController.create);
// TODO: update
usersRouter.delete(
  '/:id',
  validations.deleteValidation,
  usersController.delete,
);

export default usersRouter;
