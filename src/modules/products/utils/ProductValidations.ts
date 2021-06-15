import { celebrate, Joi, Segments } from 'celebrate';

export default class ProductValidations {
  showValidation = celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  });

  createValidation = celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().precision(2).required(),
      quantity: Joi.number().required(),
    },
  });

  updateValidation = celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().optional(),
      price: Joi.number().precision(2).optional(),
      quantity: Joi.number().optional(),
    },
  });

  deleteValidation = celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  });
}
