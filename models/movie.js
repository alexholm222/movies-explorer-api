const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    minlength: 2,
    required: true,
  },
  director: {
    type: String,
    minlength: 2,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    minlength: 2,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Необходимо вставить ссылку',
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Необходимо вставить ссылку',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Необходимо вставить ссылку',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: String,
    required: true,
    unique: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
