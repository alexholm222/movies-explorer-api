const Movie = require('../models/movie');
const NotFoundError = require('../errors/notFoundError');
const BadRequestError = require('../errors/badRequestError');
const AccessDeniedError = require('../errors/accessDeniedError');
const { BAD_REQUEST_MESSAGE, NOT_FOUND_MESSAGE_MOVIE, ACCESS_DENIED_MESSAGE } = require('../utils/constants');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send({ data: movies }))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description, image, trailerLink, nameRU, nameEN,
    thumbnail, movieId,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => res.send({ data: movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(BAD_REQUEST_MESSAGE));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.find({ movieId: req.params._id })
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(NOT_FOUND_MESSAGE_MOVIE);
      }
      if (movie.owner !== req.user._id) {
        throw new AccessDeniedError(ACCESS_DENIED_MESSAGE);
      }
      return Movie.findAndRemove({ movieId: req.params._id })
        .then((movieForDelete) => {
          res.send({ data: movieForDelete });
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(BAD_REQUEST_MESSAGE));
      } else {
        next(err);
      }
    });
};
