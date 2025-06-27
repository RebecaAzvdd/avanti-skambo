<<<<<<< HEAD
import { Router } from 'express';
import {UserController} from '../controllers/UserController.js';
const userController = new UserController();

const userRouter = Router();

userRouter.post('/users', userController.createUser);
userRouter.put('/user/:id', userController.updateUser);
userRouter.delete('/users/:id', userController.deleteUser);

export {userRouter};
=======
// src/routes/usuarioRoutes.js

const { Router } = require('express');
const UserController = require('../controllers/UserController'); 

const router = Router();

// Define a rota para listar todos os usuários
// GET /usuarios
router.get('/', UserController.listarTodos);

// Define a rota para buscar um usuário específico por ID
// GET /usuarios/:id
router.get('/:id', UserController.buscarPorId);

module.exports = router;
>>>>>>> feat: implementa endpoints GET e lógica no controller de usuário
