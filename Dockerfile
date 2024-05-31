# Use a imagem base oficial do Node.js
FROM node:16

# Crie e defina o diretório de trabalho
WORKDIR /usr/src/app

# Copie o package.json e package-lock.json
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código da aplicação
COPY . .

# Exponha a porta que a aplicação usará
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["npm", "run", "dev"]