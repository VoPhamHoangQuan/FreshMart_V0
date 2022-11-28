import express from "express";
import { isAuth } from "../vendor/index.js";
import { createOrder } from "../controllers/orderControllers.js";

const orderRouter = express.Router();
orderRouter.post("/", isAuth, createOrder);

export default orderRouter;
