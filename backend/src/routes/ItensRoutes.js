import { Router } from "express";
import { ItensController } from "../controllers/ItensController.js";
const itensController = new ItensController();

const itensRouter = Router();

itensRouter.get("/itens", itensController.getAllItens);
itensRouter.get("/itens/:id", itensController.getItensById);
itensRouter.get("/itens/disponiveis", itensController.getAllItensAvailable);
itensRouter.get("/itens/categoria", itensController.getItensByCategory);
itensRouter.get("/itens/pesquisa", itensController.getItensByKeyWord);

itensRouter.post("/itens", itensController.createItem);
itensRouter.put("/itens/:id", itensController.updateItem);
itensRouter.delete("/itens/:id", itensController.deleteItem);

export { itensRouter };
