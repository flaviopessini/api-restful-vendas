import { Router } from 'express';
import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated';
import UserValidations from '../../../utils/UserValidations';
import ProfileController from '../controllers/ProfileController';

const profileRouter = Router();
const validations = new UserValidations();
const profileController = new ProfileController();

profileRouter.use(isAuthenticated);

profileRouter.get('/', profileController.show);

profileRouter.put(
  '/',
  validations.updateProfileValidation,
  profileController.update,
);

export default profileRouter;
