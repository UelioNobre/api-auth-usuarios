const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'O campo nome é obrigatório.'],
    maxlength: [50, 'O campo nome deve ter no máximo 50 caracteres.']
  },
  email: {
    type: String,
    required: [true, 'O campo email é obrigatório.'],
    unique: true,
    index: true,
    maxlength: [100, 'O campo email deve ter no máximo 100 caracteres.'],
    match: [/.+@.+\..+/, 'Por favor, insira um endereço de email válido.']
  },
  password: {
    type: String,
    required: [true, 'O campo senha é obrigatório.'],
    maxlength: [128, 'O campo senha deve ter no máximo 128 caracteres.']
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true
  }
});

userSchema.plugin(uniqueValidator, { message: 'O {PATH} "{VALUE}" já está em uso.' });

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
