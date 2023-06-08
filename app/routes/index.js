import { orderRouter } from "./orderRoute.js";
import { productRouter } from "./productsRoute.js"
import { userRouter } from "./userRoute.js"
export default function (app) {
    app.use('/api/products', productRouter);
    app.use('/api/users', userRouter);
    app.use('/api/orders', orderRouter);
}