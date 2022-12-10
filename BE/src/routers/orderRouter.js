import express from "express";
import { isAuth } from "../vendor/index.js";
import {
    createOrder,
    getOrderById,
    modifyIsPaidOrder,
    getOrdersByUserId,
    getPaidOrdersByUserId,
    getNotPayOrdersByUserId,
    getNotDeliveryOrdersByUserId,
    getDeliveredOrdersByUserId,
} from "../controllers/orderControllers.js";

const orderRouter = express.Router();
orderRouter.post("/", isAuth, createOrder);
orderRouter.get("/order/:orderId", getOrderById);
orderRouter.post("/order/:orderId", modifyIsPaidOrder);
orderRouter.get("/userOrderList", isAuth, getOrdersByUserId);
orderRouter.get("/userOrderListPaid", isAuth, getPaidOrdersByUserId);
orderRouter.get("/userOrderListNotPay", isAuth, getNotPayOrdersByUserId);
orderRouter.get(
    "/userOrderListNotDelivery",
    isAuth,
    getNotDeliveryOrdersByUserId
);
orderRouter.get("/userOrderListDelivered", isAuth, getDeliveredOrdersByUserId);

export default orderRouter;
