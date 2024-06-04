const UserModel = require("../models/user.model");
const { hashPassword } = require("../utils/encrypt");

async function Register(req, res) {
  const { name, email, password } = req.body;
  const encryptPassword = await hashPassword(password);

  try {
    const user = new UserModel({ name, email, password: encryptPassword });
    const userSaved = await user.save();

    return res.status(201).json({ _id: userSaved._id, name: userSaved.name, email: userSaved.email });

  } catch (error) {
    console.log('Erro', error)
    if (error.errors) {
      return res
        .status(400)
        .json({
          message: showErrorMessage(error)
        });
    }

    return res.json({ message: error.message });
  }
}

module.exports = {
  Register
};
