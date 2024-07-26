const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

function generateToken(payload) {
  return jwt.sign(
    payload,
    NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
    {
      expiresIn: 1000 * 60 * 24 * 24 * 2,
    },

  );
}

function encodeToken(payload) {
  return jwt.decode(
    payload );
}
module.exports = { generateToken, encodeToken };