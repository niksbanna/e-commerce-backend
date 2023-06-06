import { router } from "./productsRoute.js"
export default function (app) {
    app.use('/api/products', router);
}