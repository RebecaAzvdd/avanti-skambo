import { Router } from 'express';
import { itens } from '../controllers/ItensController.js';

const itemRota=Router();

itemRota.get('/item', itens);

export {itemRota};