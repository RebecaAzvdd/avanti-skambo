import { Router } from 'express';
const propostaRouter = Router();

propostaRouter.post('/propostas', propostaController.createProposta);
propostaRouter.patch('/propostas/:id/cancelar', propostaController.cancelarProposta);

export { propostaRouter };
