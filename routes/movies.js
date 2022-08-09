const router = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { moviepostValid, moviedeleteValid } = require('../middlewares/validation');

router.get('/movies', getMovies);
router.post('/movies', moviepostValid, createMovie);
router.delete('/movies/:_id', moviedeleteValid, deleteMovie);

module.exports = router;
