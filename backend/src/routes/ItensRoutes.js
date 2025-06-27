import { Router } from "express";
import { ItensController } from "../controllers/ItensController.js";
const itensController = new ItensController();

const itensRouter = Router();

itensRouter.get("/itens", itensController.getAllItensAvailable);
itensRouter.get("/itens/categoria", itensController.getItensByCategory);
itensRouter.get("/itens/pesquisa", itensController.getItensByKeyWord);

export { itensRouter };