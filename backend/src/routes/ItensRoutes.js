import { Router } from "express";
import { ItensController } from "../controllers/ItensController.js";
const itensController = new ItensController();

const itensRouter = Router();

itensRouter.get("/itens", itensController.getAllItens);
itensRouter.get("/itens/:id", itensController.getItensById);
itensRouter.get("/itensDisponiveis", itensController.getAllItensAvailable);
itensRouter.get("/itens/categoria", itensController.getItensByCategory);
itensRouter.get("/itens/pesquisa", itensController.getItensByKeyWord);

export { itensRouter };