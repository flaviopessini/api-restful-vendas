import { celebrate, Joi, Segments } from 'celebrate';

export default class OrderValidations {
  showValidation = celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  });

  createValidation = celebrate({
    [Segments.BODY]: {
      customer_id: Joi.string().uuid().required(),
      products: Joi.array().required(),
    },
  });
}
