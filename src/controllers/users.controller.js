const bcrypt = require('bcryptjs');
const UserModel = require("../models/user.model");
const { hashPassword } = require('../utils/encrypt');
const { showErrorMessage } = require('../utils/mongoose.format.errors');

async function List(req, res) {
  try {
    const users = await UserModel.find();
    return res.json({ users });
  } catch ({ message }) {
    return res.json({ message });
  }
}

async function Create(req, res) {
  const {
    name: userName,
    email: userEmail,
    password: userPass } = req.body;

  const name = new String(userName).trim();
  const email = new String(userEmail).trim();
  const password = new String(userPass).trim();

  const encryptPassword = await hashPassword(password);

  try {
    const user = new UserModel({ name, email, password: encryptPassword });
    await user.save();
    return res.status(201).json({ user });
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

async function Read(req, res) {
  const { id } = req.params;

  try {
    const user = await UserModel.findById(id);
    return res.json({ user });
  } catch (error) {
    return res.json({ message });
  }
}

async function Update(req, res) {
  const { id } = req.params;
  const { name, email } = req.body;

  try {
    await UserModel.updateOne(
      { _id: id },
      { name, email },
    );

    return res.status(200).json({ message: 'Dados atualizados com sucesso!' });
  } catch (error) {
    console.log(error)
    return res.json({ message: 'Não foi possível alterar os dados do usuário' });
  }
}

async function Delete(req, res) {
  const { id } = req.params;

  try {
    const { deletedCount } = await UserModel.deleteOne(
      { _id: id }
    );

    if (deletedCount === 1) {
      return res.status(204).json({ message: 'Usuário removido com sucesso!' });
    }

    return res.status(404).json({ message: 'Usuário não encontrado' });

  } catch (error) {
    console.log(error)
    return res.json({ message: 'Não foi possível remover o  usuário' });
  }
}

module.exports = {
  List,
  Create,
  Read,
  Update,
  Delete
};
