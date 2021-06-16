import { Router } from 'express';
import SessionsController from '../controllers/SessionsController';
import UserValidations from '../utils/UserValidations';

const sessionsRouter = Router();
const sessionsController = new SessionsController();
const validations = new UserValidations();

sessionsRouter.post(
  '/',
  validations.sessionValidation,
  sessionsController.create,
);

export default sessionsRouter;
