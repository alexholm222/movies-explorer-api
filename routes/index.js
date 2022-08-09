const router = require('express').Router();
const { login, createUser } = require('../controllers/authorization');
const NotFoundError = require('../errors/notFoundError');
const auth = require('../middlewares/auth');
const { signupValid, signinValid } = require('../middlewares/validation');
const { NOT_FOUND_MESSAGE } = require('../utils/constants');

router.post('/signup', signupValid, createUser);
router.post('/signin', signinValid, login);

router.use(auth, require('./users'));
router.use(auth, require('./movies'));

router.use('*', auth, (req, res, next) => next(new NotFoundError(NOT_FOUND_MESSAGE)));

module.exports = router;
