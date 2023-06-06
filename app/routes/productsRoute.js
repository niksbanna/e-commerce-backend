import { Router } from "express";
import { index } from "../controllers/productsController.js";
export const router = Router();

router.get('/', index)