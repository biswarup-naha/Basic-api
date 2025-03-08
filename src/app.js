import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import {connectDb} from "./db/connection.js";
import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";

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

// app.use("/api/v1/", (req,res)=>res.json({message:"Welcome to API"}));
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/product", productRoutes);

export default app;