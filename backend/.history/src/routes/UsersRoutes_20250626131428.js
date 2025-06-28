import { Router } from 'express';
import {UserController} from '../controllers/UserController.js';
const userController = new UserController();

const userRouter = Router();

userRouter.post('/user/', userController)
userRouter.put('/user/:id', userController.updateUser);

export {userRouter};