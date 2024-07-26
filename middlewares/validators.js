const { Joi, celebrate } = require('celebrate');
const validator = require('validator');

const validateEditUser = celebrate({
  body: {
    email: Joi.string()
      .min(2)
      .required()
      .custom((value, helpers) => {
        if (validator.isEmail(value)) {
          return value;
        }
        return helpers.message('Невалидный емаил');
      })
      .messages({
        'string.min': 'Минимальная длина - 2 символа',
        'any.required': 'Поле обязательно для заполнения',
      }),
    name: Joi.string().min(2).max(30).required()
      .messages({
        'string.min': 'Минимальная длина - 2 символа',
        'string.max': 'Максимальная длина - 30 символов',
        'any.required': 'Поле обязательно для заполнения',
      }),
  },
});

const validateRegisterUser = celebrate({
  body: {
    email: Joi.string()
      .min(2)
      .required()
      .custom((value, helpers) => {
        if (validator.isEmail(value)) {
          return value;
        }
        return helpers.message('Невалидный емаил');
      })
      .messages({
        'string.min': 'Минимальная длина - 2 символа',
        'any.required': 'Поле обязательно для заполнения',
      }),
    password: Joi.string().min(2).required().messages({
      'string.min': 'Минимальная длина - 2 символа',
      'any.required': 'Поле обязательно для заполнения',
    }),
    name: Joi.string().min(2).max(30).required()
      .messages({
        'string.min': 'Минимальная длина - 2 символа',
        'string.max': 'Максимальная длина - 30 символов',
        'any.required': 'Поле обязательно для заполнения',
      }),
  },
});

const validateSigninUser = celebrate({
  body: {
    email: Joi.string()
      .min(2)
      .required()
      .custom((value, helpers) => {
        if (validator.isEmail(value)) {
          return value;
        }
        return helpers.message('Невалидный емаил');
      })
      .messages({
        'string.min': 'Минимальная длина - 2 символа',
        'any.required': 'Поле обязательно для заполнения',
      }),
    password: Joi.string().min(2).required().messages({
      'string.min': 'Минимальная длина - 2 символа',
      'any.required': 'Поле обязательно для заполнения',
    }),
  },
});

const validateMovie = celebrate({
  body: {
    country: Joi.string().required().messages({
      'any.required': 'Поле обязательно для заполнения',
    }),
    director: Joi.string().required().messages({
      'any.required': 'Поле обязательно для заполнения',
    }),
    duration: Joi.number().required().messages({
      'any.required': 'Поле обязательно для заполнения',
    }),
    year: Joi.string().required().messages({
      'any.required': 'Поле обязательно для заполнения',
    }),
    description: Joi.string().required().messages({
      'any.required': 'Поле обязательно для заполнения',
    }),
    image: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (validator.isURL(value)) {
          return value;
        }
        return helpers.message('Невалидная ссылка');
      })
      .messages({
        'any.required': 'Поле обязательно для заполнения',
      }),
    trailerLink: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (validator.isURL(value)) {
          return value;
        }
        return helpers.message('Невалидная ссылка');
      })
      .messages({
        'any.required': 'Поле обязательно для заполнения',
      }),
    thumbnail: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (validator.isURL(value)) {
          return value;
        }
        return helpers.message('Невалидная ссылка');
      })
      .messages({
        'any.required': 'Поле обязательно для заполнения',
      }),
    movieId: Joi.number().required().messages({
      'any.required': 'Поле обязательно для заполнения',
    }),
    nameRU: Joi.string().required().messages({
      'any.required': 'Поле обязательно для заполнения',
    }),
    nameEN: Joi.string().required().messages({
      'any.required': 'Поле обязательно для заполнения',
    }),
  },
});

const validateMovieId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24),
  }),
});

module.exports = {
  validateRegisterUser,
  validateSigninUser,
  validateEditUser,
  validateMovie,
  validateMovieId,
};