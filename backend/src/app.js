// src/app.js

const express = require('express');

// Importa os arquivos de rotas
const usersRoutes = require('./routes/UsersRoutes');
//const itensRoutes = require('./routes/ItensRoutes');
//const propostaRoutes = require('./routes/PropostaRoutes');

// Cria a aplicação Express
const app = express();

// Middleware para o Express entender requisições com corpo em JSON
app.use(express.json());

// Define os endpoints base para cada conjunto de rotas
// Todas as rotas definidas em UsersRoutes serão prefixadas com /usuarios
app.use('/usuarios', usersRoutes);

// Todas as rotas de ItensRoutes serão prefixadas com /itens
//app.use('/itens', itensRoutes);

// Todas as rotas de PropostaRoutes serão prefixadas com /propostas
//app.use('/propostas', propostaRoutes);


// Exporta a instância do app para ser usada no server.js
module.exports = app;