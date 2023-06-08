import { Router } from "express";
import { deleteOrder, getAllOrders, getSingleOrder, myOrders, newOrder, updateOrder } from "../controllers/orderController.js";
import { authoriseRoles, isAuthenticatedUser } from "../../middlewares/auth.js";

export const orderRouter = Router();

orderRouter.post('/new', isAuthenticatedUser, newOrder);
orderRouter.get('/me', isAuthenticatedUser, myOrders);
orderRouter.get('/admin/', isAuthenticatedUser, authoriseRoles("admin"), getAllOrders);
orderRouter.put('/admin/:id', isAuthenticatedUser, authoriseRoles("admin"), updateOrder);
orderRouter.delete('/admin/:id', isAuthenticatedUser, authoriseRoles("admin"), deleteOrder);
orderRouter.get('/:id', isAuthenticatedUser, getSingleOrder);
