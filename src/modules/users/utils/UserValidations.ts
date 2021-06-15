import { celebrate, Joi, Segments } from 'celebrate';

export default class UserValidations {
  showValidation = celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  });

  createValidation = celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  });

  // updateValidation = celebrate({
  //   [Segments.PARAMS]: {
  //     id: Joi.string().uuid().required(),
  //   },
  //   [Segments.BODY]: {
  //     name: Joi.string().optional(),
  //     price: Joi.number().precision(2).optional(),
  //     quantity: Joi.number().optional(),
  //   },
  // });

  deleteValidation = celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  });
}
