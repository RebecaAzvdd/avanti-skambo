import { Router } from "express";
import { PropostaController } from "../controllers/Propostacontroller.js";
const propostaController = new PropostaController();
const propostaRouter = Router();

propostaRouter.patch("/propostas/:id/status", propostaController.updateStatusProposta)
propostaRouter.post('/propostas', propostaController.createProposta);
propostaRouter.patch('/propostas/:id/cancelar', propostaController.cancelarProposta);
propostaRouter.get('/propostas/user/:userId', propostaController.getPropostaByUserId);
export {propostaRouter};