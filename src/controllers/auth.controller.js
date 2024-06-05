const UserModel = require("../models/user.model");
const { verifyPassword } = require("../utils/encrypt");
const { generateToken } = require("../utils/tokenizer");

const msgUserNotFound = { message: 'Usuário não encontrado' };

async function signin(req, res) {
  const { body } = req;
  const user = UserModel
    .where({ email: body.email.trim(), isActive: true });

  const result = await user.findOne();

  if (!result) {
    return res
      .status(404)
      .json(msgUserNotFound);
  }

  const isValid = await verifyPassword(body.password.trim(), result.password);

  if (!isValid) {
    return res
      .status(404)
      .json(msgUserNotFound);
  }

  const { _id, name, email } = result;
  const token = generateToken({ _id, name, email });

  return res.json({ user: { _id, name, email, token } });
}

module.exports = {
  signin
};
