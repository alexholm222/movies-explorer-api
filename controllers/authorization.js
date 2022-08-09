const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequestError = require('../errors/badRequestError');
const RegistrationError = require('../errors/registrationError');
const { BAD_REQUEST_MESSAGE, REGISTRATION_MESSAGE } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.createUser = (req, res, next) => {
  const { email, password, name } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({ email, password: hash, name })
      .then((user) => res.send({ email: user.email, name: user.name }))
      .catch((err) => {
        if (err.name === 'ValidationError') {
          next(new BadRequestError(BAD_REQUEST_MESSAGE));
        } else if (err.code === 11000) {
          next(new RegistrationError(REGISTRATION_MESSAGE));
        } else {
          next(err);
        }
      }))
    .catch((err) => next(err));
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'secret',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch((err) => {
      if (err.name === 'UnauthorizedError') {
        res.status(err.statusCode).send({ message: err.message });
      } else {
        next(err);
      }
    });
};
