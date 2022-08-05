const Movie = require('../models/movie');
const NotFoundError = require('../errors/notFoundError');
const BadRequestError = require('../errors/badRequestError');
const AccessDeniedError = require('../errors/accessDeniedError');

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
        next(new BadRequestError('Переданы некорректные данные при добавлении фильма.'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findOne({ movieId: req.params._id })
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Фильм с указанным id не найдена');
      }
      if (String(movie.owner) !== req.user._id) {
        throw new AccessDeniedError('Недостаточно прав');
      }
      return Movie.findOneAndRemove({ movieId: req.params._id })
        .then((movieForDelete) => {
          res.send({ data: movieForDelete });
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Передан неккоректный _id для удаления фильма'));
      } else {
        next(err);
      }
    });
};
