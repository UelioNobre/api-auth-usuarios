const bcrypt = require('bcryptjs');

async function hashPassword(plainPassword) {
  try {
    const saltRounds = 10; // Número de rounds de sal (10 é um valor comum)
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.error('Erro ao hashear a senha:', error);
    return false;
  }
}

// Função para verificar senha
async function verifyPassword(plainPassword, hashedPassword) {
  try {
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    return isMatch;
  } catch (error) {
    return false;
  }
}

module.exports = {
  hashPassword,
  verifyPassword
}
