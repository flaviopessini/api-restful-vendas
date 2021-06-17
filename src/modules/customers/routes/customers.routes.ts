import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import { Router } from 'express';
import CustomersController from '../controllers/CustomersController';
import CustomerValidations from '../utils/CustomerValidations';

const customersRouter = Router();
const customersController = new CustomersController();
const validations = new CustomerValidations();

customersRouter.use(isAuthenticated);

customersRouter.get('/', customersController.index);
customersRouter.get(
  '/:id',
  validations.showValidation,
  customersController.show,
);
customersRouter.post(
  '/',
  validations.createValidation,
  customersController.create,
);
customersRouter.put(
  '/:id',
  validations.updateValidation,
  customersController.update,
);
customersRouter.delete(
  '/:id',
  validations.deleteValidation,
  customersController.delete,
);

export default customersRouter;
