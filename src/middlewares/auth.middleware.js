const { decodeToken } = require("../utils/tokenizer");

function authMiddleware(req, _res, next) {
  try {
    const header = req.headers.authorization || false;

    if (!header) {
      next(new Error('Usuário não autenticado', { cause: { statusCode: 401 } }));
    }

    const authorization = header.trim();
    const token = decodeToken(authorization.replace('Bearer ', ''));

    req.token = token;
    next();
  } catch (_error) {
    next(new Error('Token inválido', { cause: { statusCode: 400 } }));
  }
}

module.exports = authMiddleware;
