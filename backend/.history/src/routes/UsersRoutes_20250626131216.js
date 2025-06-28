import { Router } from 'express';
import {UserController} from '../controllers/UserController.js';
const userController = new UserController();

const userRouter = Router();

user
userRouter.put('/user/:id', userController.updateUser);

export {userRouter};