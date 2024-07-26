const jwt = require('jsonwebtoken');
const { NotFoundError } = require('../errors/NotFoundError');
const { UnauthorizedError } = require('../errors/UnauthorizedError');
const {
  authorizeMessage,
  noAccessMessage,
} = require('../constants/messages');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.auth = (req, res, next) => {
  const { moviesToken } = req.cookies;

  if (!moviesToken) {
    throw new NotFoundError(authorizeMessage);
  }

  let payload;
  try {
    payload = jwt.verify(
      moviesToken,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
    );
  } catch (err) {
    next(new UnauthorizedError(noAccessMessage));
  }

  req.user = payload;

  next();
};