const {
  dataMovies = 'mongodb://localhost:27017/moviesdb',
  port = 3000,
  NODE_ENV,
  JWT_SECRET,
} = process.env;

module.exports = {
  dataMovies, port, NODE_ENV, JWT_SECRET,
};
