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

  sessionValidation = celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  });

  forgotPasswordValidation = celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  });

  resetPasswordValidation = celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
      password: Joi.string().required(),
      password_confirmation: Joi.string().required().valid(Joi.ref('password')),
    },
  });

  updateProfileValidation = celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string().optional(),
      password_confirmation: Joi.string()
        .valid(Joi.ref('password'))
        .when('password', {
          is: Joi.exist(),
          then: Joi.required(),
        }),
    },
  });
}
