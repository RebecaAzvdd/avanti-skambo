import { Router } from 'express';
import {UserController} from '../controllers/UserController.js';
const userController = new UserController();

const userRouter = Router();

userRouter.post('/users', userController.createUser);
userRouter.put('/user/:id', userController.updateUser);
userRouter.delete('/users/:id', userController.deleteUser);
userRouter.get('/', UserController.listarTodos);
userRouter.get('/:id', UserController.buscarPorId);

export {userRouter};
