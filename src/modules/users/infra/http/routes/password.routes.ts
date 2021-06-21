import { Router } from 'express';
import ForgotPasswordController from '../controllers/ForgotPasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';
import UserValidations from '../../../utils/UserValidations';

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();
const validations = new UserValidations();

passwordRouter.post(
  '/forgot',
  validations.forgotPasswordValidation,
  forgotPasswordController.create,
);

passwordRouter.post(
  '/reset',
  validations.resetPasswordValidation,
  resetPasswordController.create,
);

export default passwordRouter;
