import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import {connectDb} from "./db/connection.js";
import routes from "./routes/index.js";

// env config
dotenv.config();
const app = express();

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "*",
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type, Authorization",
}));

// db connection
connectDb();

// router
app.use("/api/v1", routes);

export default app;