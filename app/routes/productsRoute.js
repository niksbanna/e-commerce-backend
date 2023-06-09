import { Router } from "express";
import { create, createProductReview, deleteReview, destroy, getAdminProducts, getProductReviews, index, show, update } from "../controllers/productsController.js";
import { authoriseRoles, isAuthenticatedUser } from "../../middlewares/auth.js";
export const productRouter = Router();

productRouter.get('/', index);
productRouter.get('/reviews', getProductReviews);
productRouter.get('/:id', show);
productRouter.get('/admin/products', getAdminProducts);
productRouter.delete('/reviews', isAuthenticatedUser, deleteReview);
productRouter.post('/create', isAuthenticatedUser, create);
productRouter.put('/review', isAuthenticatedUser, createProductReview);
productRouter.put('/:id', isAuthenticatedUser, authoriseRoles("admin"), update);
productRouter.delete('/:id', isAuthenticatedUser, authoriseRoles("admin"), destroy);
