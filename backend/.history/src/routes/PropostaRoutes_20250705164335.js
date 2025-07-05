import { Router } from "express";
import { PropostaController } from "../controllers/Propostacontroller.js";
const propostaController = new PropostaController();
const propostaRouter = Router();

propostaRouter.patch("/propostas/:id/status", propostaController.updateStatusProposta)

export {propostaRouter};