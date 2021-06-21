import { Router } from 'express';
import ProductsController from '../controllers/ProductsController';
import ProductValidations from '../../../utils/ProductValidations';

const productsRouter = Router();
const productsController = new ProductsController();
const validations = new ProductValidations();

productsRouter.get('/', productsController.index);
productsRouter.get('/:id', validations.showValidation, productsController.show);
productsRouter.post(
  '/',
  validations.createValidation,
  productsController.create,
);
productsRouter.put(
  '/:id',
  validations.updateValidation,
  productsController.update,
);
productsRouter.delete(
  '/:id',
  validations.deleteValidation,
  productsController.delete,
);

export default productsRouter;
