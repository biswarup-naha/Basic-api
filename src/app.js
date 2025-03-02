import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import {connectDb} from "./db/connection.js";
import userRoutes from "./routes/user.routes.js";

dotenv.config();
const app = express();

//middleware
app.use(express.json());
app.use(cors({
    origin: "*",
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type, Authorization",
}));

// db connection
connectDb();

app.use("/api/v1/user", userRoutes);

export default app;