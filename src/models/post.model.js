const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, 'O campo titulo é obrigatório.'],
    maxlength: [50, 'O campo titulo deve ter no máximo 50 caracteres.']
  },
  description: {
    type: String,
    required: [true, 'O campo descrição é obrigatório.'],
    maxlength: [500, 'O campo descrição deve ter no máximo 500 caracteres.'],
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'users',
    required: true
  }
});

postSchema.plugin(uniqueValidator, { message: 'O {PATH} "{VALUE}" já está em uso.' });

const PostModel = mongoose.model('Post', postSchema);

module.exports = PostModel;
