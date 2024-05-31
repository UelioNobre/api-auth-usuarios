require('dotenv').config();
const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongo:27017/meubanco';

async function connectDatabase() {
  // if your database has auth enabled
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` 
  try {
    console.log('### Conexão com banco de dados :: Realizando conexão...')
    await mongoose.connect(MONGO_URI);
    console.log('### Conexão com banco de dados: OK');
  } catch (error) {
    console.log('### Conexão com banco de dados :: ERROR :: ');
    console.log('### Conexão com banco de dados :: ERROR :: ', error.message);
  }
}

module.exports = connectDatabase;

