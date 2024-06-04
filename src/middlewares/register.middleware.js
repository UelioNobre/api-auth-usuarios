async function validateFields(req, res, next) {
  const {
    name: userName,
    email: userEmail,
    password: userPass } = req.body;

  // Name
  if (!userName) {
    return next(new Error('O campo nome é obrigatório', { cause: { statusCode: 400 } }));
  }

  const userNameLength = userName.length;
  if (userNameLength < 5 || userNameLength > 50) {
    return next(new Error('O campo nome deve ter entre 5 e 50 caracteres', { cause: { statusCode: 400 } }));
  }

  // Email
  if (!userEmail) {
    return next(new Error('O campo email é obrigatório', { cause: { statusCode: 400 } }));
  }

  const userEmailLength = userEmail.length;
  if (userEmailLength < 8 || userEmailLength > 100) {
    return next(new Error('O campo email deve ter entre 8 e 100 caracteres', { cause: { statusCode: 400 } }));
  }

  // Password
  if (!userPass) {
    return next(new Error('O campo senha é obrigatório', { cause: { statusCode: 400 } }));
  }

  const userPasswordLength = userPass.length;
  if (userPasswordLength < 8 || userPasswordLength > 128) {
    return next(new Error('O campo senha deve ter entre 8 e 128 caracteres', { cause: { statusCode: 400 } }));
  }

  req.body.name = new String(userName).trim().toString();
  req.body.email = new String(userEmail).trim().toString();
  req.body.password = new String(userPass).trim().toString();
  return next();
}

module.exports = {
  validateFields
};
