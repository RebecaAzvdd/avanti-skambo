import { Router } from 'express';
import { UserController } from '../controllers/UserController.js';

const router = Router();
const userController = new UserController();

router.post('/usuarios', userController.createUser);
router.put('/usuarios/:id', userController.updateUser);
router.delete('/usuarios/:id', userController.deleteUser);

router.get('/usuarios', userController.listarTodos);
router.get('/usuarios/:id', userController.buscarPorId);

export { router as userRouter };