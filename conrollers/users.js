const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const User = require('../models/user');
const {
  NotFoundError,
  UnAuthorizationError,
  ConflictError,
  BadRequestError,
  ServerError,
} = require('../errors/index');

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new UnAuthorizationError('Неправильные почта или пароль');
      }

      bcrypt
        .compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnAuthorizationError('Неправильные почта или пароль');
          }
          const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key', {
            expiresIn: '7d',
          });

          res.send({ token });
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};
const createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, email, password: hash }))
    .then((users) => res.send({ name: users.name, email: users.email, _id: users._id }))
    .catch((err) => {
      if (err.email === 'ValidationError') {
        next(
          new BadRequestError(
            'Переданы некорректные данные при создании пользователя.',
          ),
        );
      } else if (err.code === 11000) {
        next(new ConflictError('Пользователь с таким email уже существует'));
      } else {
        next(new ServerError('Ошибка сервера.'));
      }
    });
};
const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((users) => {
      if (!users) {
        throw new NotFoundError(' Пользователь с указанным _id не найден.');
      }
      res.send(users);
    })
    .catch(() => {
      next(new ServerError('Ошибка сервера.'));
    });
};
const updateUsers = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true })
    .then((users) => {
      if (!users) {
        throw new BadRequestError(' Пользователь с указанным _id не найден.');
      }
      res.send(users);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(
          new BadRequestError(
            'Переданы некорректные данные при обновлении имени пользователя.',
          ),
        );
      } else if (err.email === 'ValidationError') {
        next(
          new BadRequestError(
            'Переданы некорректные данные при обновлении email пользователя.',
          ),
        );
      }
      next(new ServerError('Ошибка сервера.'));
    });
};

module.exports = {
  createUser,
  login,
  getCurrentUser,
  updateUsers,
};
