import { Router } from "express";
import { PropostaController } from "../controllers/Propostacontroller.js";
const propostaController = new PropostaController();
const propostaRouter = Router();

propostaRouter.patch("/propostas/:propostaId/status", propostaController.updateStatusProposta)

export {propostaRouter};