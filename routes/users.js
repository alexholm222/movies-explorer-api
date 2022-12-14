const router = require('express').Router();
const { getUser, updateUser } = require('../controllers/users');
const { userupdateValid } = require('../middlewares/validation');

router.get('/users/me', getUser);
router.patch('/users/me', userupdateValid, updateUser);

module.exports = router;
