const jwt = require('jsonwebtoken');

const { UnAuthorizationError } = require('../errors/index');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnAuthorizationError('Необходима авторизация1');
  }
  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    throw new UnAuthorizationError('Необходима авторизация2');
  }

  req.user = payload;

  next();
};
