import express from "express";
import morgan from "morgan";
import { config } from "dotenv";
import connectDB from "./config/db.js";
import routes from "./app/routes/index.js";

//rest object
const app = express();

// configure env
config();

//database config
connectDB();

//middlewares
app.use(express.json());
app.use(morgan('dev'));

routes(app);

const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.send("<h1>Welcome to E-commerce app.</h1>");
})

app.listen(port, () => {
    console.log(`Server is listning on ${process.env.DEV_MODE} mode on port ${port}`)
})