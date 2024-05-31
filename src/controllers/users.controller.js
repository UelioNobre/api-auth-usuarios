const UserModel = require("../models/user.model")

async function List(req, res) {
  try {
    const users = await UserModel.find();
    return res.json({ users });
  } catch ({ message }) {
    return res.json({ message });
  }
}

async function Create(req, res) {
  const { name, email } = req.body;

  try {
    const user = new UserModel({ name, email });
    await user.save();
    return res.status(201).json({ user });
  } catch ({ message }) {
    return res.json({ message });
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
