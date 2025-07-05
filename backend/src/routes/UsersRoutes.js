import { Router } from 'express';
import { UserController } from '../controllers/UserController.js';

const router = Router();
const userController = new UserController();

router.get('/users', userController.listarTodos);
router.get('/users/:id', userController.buscarPorId);

router.post('/users', userController.createUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

export { router as userRouter };