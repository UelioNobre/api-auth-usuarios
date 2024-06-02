const UserModel = require("../models/user.model");
const { verifyPassword } = require("../utils/encrypt");
const { generateToken } = require("../utils/tokenizer");

const msgUserNotFound = { message: 'Usuário não encontrado' };

async function signin(req, res) {
  const { body } = req;
  const user = UserModel.where({ email: body.email.trim() });
  const result = await user.findOne() || false;

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

  return res.json({ message: token });
}

module.exports = {
  signin
};
