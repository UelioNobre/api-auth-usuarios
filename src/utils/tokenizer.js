require('dotenv').config();
const jwt = require('jsonwebtoken');
const SECRET = process.env.TOKEN_SALT || 'secretsaltforhashing';

function generateToken(payload = Object) {
  const options = { expiresIn: '30d' };
  const token = jwt.sign({ data: payload }, SECRET, options);
  return token;
}

function decodeToken(payload = "") {
  const token = payload.replace('Bearer ', '')
  const decoded = jwt.verify(token, SECRET);
  return decoded;
}

module.exports = {
  generateToken,
  decodeToken
};
