const { celebrate, Joi } = require('celebrate');
const { linkValidator } = require('../utils/linkValidator');

const signupValid = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().max(30).min(2),
  }),
});

const signinValid = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const moviepostValid = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(linkValidator),
    trailerLink: Joi.string().required().custom(linkValidator),
    thumbnail: Joi.string().required().custom(linkValidator),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const moviedeleteValid = celebrate({
  params: Joi.object().keys({
    _id: Joi.number().required(),
  }),
});

const userupdateValid = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().max(30).min(2),
  }),
});

module.exports = {
  signupValid,
  signinValid,
  moviepostValid,
  moviedeleteValid,
  userupdateValid,
};
