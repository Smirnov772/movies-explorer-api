const usersRouter = require('express').Router();
const { validateUpdateUser } = require('../middlewares/validation');
// const validationObject = require('../middlewares/validationObject');

const {
  getCurrentUser,
  updateUsers,
} = require('../conrollers/users');

usersRouter.get('/api/me', getCurrentUser);
usersRouter.patch('/api/me', validateUpdateUser, updateUsers);

exports.usersRouter = usersRouter;
