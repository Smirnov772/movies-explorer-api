const router = require('express').Router();

const { usersRouter } = require('./users');
const { moviesRouter } = require('./movies');
const auth = require('../middlewares/auth');

const {
  validateRegisterBody,
  validateRegistration,
} = require('../middlewares/validation');
const { createUser, login } = require('../conrollers/users');

router.post('/api/signin', validateRegisterBody, login);
router.post('/api/signup', validateRegistration, createUser);

router.use('/users', auth, usersRouter);
router.use('/movies', auth, moviesRouter);

exports.router = router;
