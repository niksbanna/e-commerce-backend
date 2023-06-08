import express from "express";
import morgan from "morgan";
import { config } from "dotenv";
import connectDB from "./config/db.js";
import routes from "./app/routes/index.js";
import cors from 'cors';
import errorMiddleware from "./middlewares/error.js";
import cookieParser from "cookie-parser";

// handling uncaught exception
process.on('uncaughtExceptionMonitor', (err) => {
    console.log(`Error: ${err}`)
    console.log('Shutting down the server due to uncaught exception.')

    process.exit(1);
})

//rest object
const app = express();

// configure env
config();

//database config
connectDB();

//middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(cookieParser());

routes(app);

// error middleware
app.use(errorMiddleware);

const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.send("<h1>Welcome to E-commerce app.</h1>");
})

const server = app.listen(port, () => {
    console.log(`Server is listning on ${process.env.DEV_MODE} mode on port ${port}`)
})

// handling unhandled promise rejection
process.on('unhandledRejection', err => {
    console.log(`Error: ${err}`);
    console.log('Shutting down the server due to unhandled promise rejection.')

    server.close(() => {
        process.exit(1);
    })
})