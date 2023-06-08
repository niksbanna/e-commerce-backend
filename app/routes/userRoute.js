import { Router } from "express";
import { deleteUser, forgotPassword, getAllUser, getSingleUser, getUserDetails, loginUser, logout, registerUser, resetPassword, updatePassword, updateProfile, updateUserRole } from "../controllers/userController.js";
import { authoriseRoles, isAuthenticatedUser } from "../../middlewares/auth.js";
export const userRouter = Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/password/forgot', forgotPassword);
userRouter.get('/logout', logout);
userRouter.put('/reset/:token', resetPassword);
userRouter.put('/password/update', isAuthenticatedUser, updatePassword);
userRouter.put('/me/update', isAuthenticatedUser, updateProfile);
userRouter.get('/me', isAuthenticatedUser, getUserDetails)


userRouter.get('/admin/users', isAuthenticatedUser, authoriseRoles("admin"), getAllUser);
userRouter.get('/admin/user/:id', isAuthenticatedUser, authoriseRoles("admin"), getSingleUser);
userRouter.put('/admin/user/:id', isAuthenticatedUser, authoriseRoles("admin"), updateUserRole);
userRouter.delete('/admin/user/:id', isAuthenticatedUser, authoriseRoles("admin"), deleteUser);


