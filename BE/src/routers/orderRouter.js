import express from "express";
import { isAuth } from "../vendor/index.js";
import {
    createOrder,
    getOrderById,
    modifyIsPaidOrder,
} from "../controllers/orderControllers.js";

const orderRouter = express.Router();
orderRouter.post("/", isAuth, createOrder);
orderRouter.get("/order/:orderId", getOrderById);
orderRouter.post("/order/:orderId", modifyIsPaidOrder);

export default orderRouter;
