import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import { Router } from 'express';
import OrdersController from '../controllers/OrdersController';
import OrderValidations from '../utils/OrderValidations';

const ordersRouter = Router();
const ordersController = new OrdersController();
const validations = new OrderValidations();

ordersRouter.use(isAuthenticated);

ordersRouter.get('/:id', validations.showValidation, ordersController.show);
ordersRouter.post('/', validations.createValidation, ordersController.create);

export default ordersRouter;
