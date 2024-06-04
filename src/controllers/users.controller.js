const bcrypt = require('bcryptjs');
const UserModel = require("../models/user.model");
const { hashPassword } = require('../utils/encrypt');
const { showErrorMessage } = require('../utils/mongoose.format.errors');

async function Read(req, res) {
  const { data } = req.token;

  try {
    const user = await UserModel.findById(data._id).select('_id name email');
    return res.json({ user });
  } catch ({ message }) {
    return res.json({ message });
  }
}

async function Create(req, res) {
  return res.status(403).json({ message: 'Operação não' });
}


async function Update(req, res) {
  const { data } = req.token;
  const { name, password } = req.body;

  try {
    const encryptPass = await hashPassword(password);
    const updateUser = await UserModel.updateOne(
      { _id: data._id },
      { name, password: encryptPass },
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
  Create,
  Read,
  Update,
  Delete
};
