import { Router } from "express";
import { create, destroy, index, show, update } from "../controllers/productsController.js";
export const router = Router();

router.get('/', index);
router.get('/:id', show);
router.post('/create', create);
router.put('/:id', update);
router.delete('/:id', destroy);