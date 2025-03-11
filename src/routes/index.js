import express from 'express';
import productRoutes from './product.routes.js';
import userRoutes from './user.routes.js';

const routerApp = express();

routerApp.use("/user", userRoutes);
routerApp.use("/product", productRoutes);

export default routerApp;