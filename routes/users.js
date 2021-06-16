const usersRouter = require('express').Router();
const { validateUpdateUser } = require('../middlewares/validation');
// const validationObject = require('../middlewares/validationObject');

const {
  getCurrentUser,
  updateUsers,
} = require('../conrollers/users');

usersRouter.get('/me', getCurrentUser);
usersRouter.patch('/me', validateUpdateUser, updateUsers);

exports.usersRouter = usersRouter;
