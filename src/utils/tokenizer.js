require('dotenv').config();
const jwt = require('jsonwebtoken');
const SECRET = process.env.TOKEN_SALT || 'secretsaltforhashing';

function generateToken(payload) {
  const options = { expiresIn: '30d' };
  const token = jwt.sign({ data: payload }, SECRET, options);
  return token;
}

function decodeToken(token) {
  const decoded = jwt.verify(token, SECRET);
  return decoded;
}

module.exports = {
  generateToken,
  decodeToken
};
