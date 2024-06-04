const { decodeToken } = require("../utils/tokenizer");

function authMiddleware(req, _res, next) {
  try {
    const header = req.headers.authorization || "";
    const authorization = header.trim();
    const token = decodeToken(authorization.replace('Bearer ', ''));

    req.token = token;
    next();
  } catch (_error) {
    const erro = new Error('Token inválido', { cause: { statusCode: 400 } });
    next(erro);
  }
}

module.exports = authMiddleware;
