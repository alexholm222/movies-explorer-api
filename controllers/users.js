const User = require('../models/user');
const NotFoundError = require('../errors/notFoundError');
const BadRequestError = require('../errors/badRequestError');
const RegistrationError = require('../errors/registrationError');
const { BAD_REQUEST_MESSAGE, NOT_FOUND_MESSAGE_USER, REGISTRATION_MESSAGE } = require('../utils/constants');

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(NOT_FOUND_MESSAGE_USER);
      } else {
        res.send({ data: user });
      }
    })
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email }, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (!user) {
        throw new NotFoundError(NOT_FOUND_MESSAGE_USER);
      } else {
        res.send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(BAD_REQUEST_MESSAGE));
      } else if (err.code === 11000) {
        next(new RegistrationError(REGISTRATION_MESSAGE));
      } else {
        next(err);
      }
    });
};
