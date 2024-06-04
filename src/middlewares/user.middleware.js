const UserModel = require("../models/user.model");

async function userExists(req, _res, next) {
  const { token } = req;
  const user = await UserModel.findById(token.data._id) || false;

  if (!user) {
    return next(new Error('Usuário não encontrado', { cause: { statusCode: 404 } }));
  }

  return next();
}

function userNotChangePassword(req, _res, next) {
  console.log(req.body);
  if (Object.keys(req.body).includes('email')) {
    return next(new Error('Não é permitido alterar o email de cadastro', { cause: { statusCode: 403 } }));
  }

  return next();
}

async function userIsActive(req, res, next) {
  const { token } = req;
  const user = await UserModel.findById(token.data._id).select('isActive') || false;


  if (!user.isActive) {
    return next(new Error('Usuário não encontrado', { cause: { statusCode: 404 } }));
  }

  return next();
}

module.exports = {
  userExists,
  userNotChangePassword,
  userIsActive
};
