import OrderModel from "../models/OrderModel.js";

export const createOrder = async (req, res) => {
    try {
        if (req.body.orderItems.length === 0) {
            res.status(400).json({ error: "carr is empty" });
        } else {
            const newOrder = new OrderModel({
                orderItems: req.body.orderItems,
                shippingInfo: req.body.shippingInfo,
                paymentMethod: req.body.paymentMethod,
                userInfo: req.userInfo.id,
            });
            const createdOrder = await newOrder.save();
            res.status(200).json({
                message: "new order created",
                newOrder: createdOrder,
            });
        }
    } catch (err) {
        res.status(500).json({ error: err });
    }
};
