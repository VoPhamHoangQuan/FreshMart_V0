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

export const getOrderById = async (req, res) => {
    try {
        if (req.params.orderId) {
            const orderId = req.params.orderId;
            const order = await OrderModel.findById(orderId).populate([
                {
                    path: "orderItems",
                    populate: {
                        path: "productId",
                        select: "name image primaryPrice",
                    },
                },
                {
                    path: "userInfo",
                    select: "name gender phone",
                },
            ]);
            res.status(201).json(order);
        } else {
            res.status(404).json({ error: "orderId invalid" });
        }
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const modifyIsPaidOrder = async (req, res) => {
    try {
        if (req.params.orderId && req.body.isPaid && req.body.paidAt) {
            const orderId = req.params.orderId;
            await OrderModel.findOneAndUpdate(
                { _id: orderId },
                { isPaid: req.body.isPaid, paidAt: req.body.paidAt }
            );
            res.status(200).send("update order success");
        } else {
            res.status(404).json({ error: "isPaid orderId invalid" });
        }
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const modifyIsDeletedOrder = async (req, res) => {
    try {
        if (req.params.orderId && req.body.isDeleted) {
            const orderId = req.params.orderId;
            await OrderModel.findOneAndUpdate(
                { _id: orderId },
                { isDeleted: req.body.isDeleted }
            );
            res.status(200).send("update isDeleted order success");
        } else {
            res.status(404).json({ error: "isDeleted orderId invalid" });
        }
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const getOrdersIsDeletedByUserId = async (req, res) => {
    try {
        if (req.userInfo.id) {
            const userId = req.userInfo.id;
            const orderList = await OrderModel.find({
                userInfo: userId,
                isDeleted: true,
            })
                .populate({
                    path: "orderItems",
                    populate: {
                        path: "productId",
                        select: "name image primaryPrice",
                    },
                })
                .sort({
                    createdAt: -1,
                });
            res.status(200).json(orderList);
        } else {
            res.status(404).json({ error: "getOrdersByUserId userId Invalid" });
        }
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const getOrdersByUserId = async (req, res) => {
    try {
        if (req.userInfo.id) {
            const userId = req.userInfo.id;
            const orderList = await OrderModel.find({
                userInfo: userId,
                isDeleted: false,
            })
                .populate({
                    path: "orderItems",
                    populate: {
                        path: "productId",
                        select: "name image primaryPrice",
                    },
                })
                .sort({
                    createdAt: -1,
                });
            res.status(200).json(orderList);
        } else {
            res.status(404).json({ error: "getOrdersByUserId userId Invalid" });
        }
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const getPaidOrdersByUserId = async (req, res) => {
    try {
        if (req.userInfo.id) {
            const userId = req.userInfo.id;
            const orderList = await OrderModel.find({
                userInfo: userId,
                isPaid: true,
                isDeleted: false,
            })
                .populate({
                    path: "orderItems",
                    populate: {
                        path: "productId",
                        select: "name image primaryPrice",
                    },
                })
                .sort({
                    createdAt: -1,
                });
            res.status(200).json(orderList);
        } else {
            res.status(404).json({ error: "getOrdersByUserId userId Invalid" });
        }
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const getNotPayOrdersByUserId = async (req, res) => {
    try {
        if (req.userInfo.id) {
            const userId = req.userInfo.id;
            const orderList = await OrderModel.find({
                userInfo: userId,
                isPaid: false,
                isDeleted: false,
            })
                .populate({
                    path: "orderItems",
                    populate: {
                        path: "productId",
                        select: "name image primaryPrice",
                    },
                })
                .sort({
                    createdAt: -1,
                });
            res.status(200).json(orderList);
        } else {
            res.status(404).json({ error: "getOrdersByUserId userId Invalid" });
        }
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const getNotDeliveryOrdersByUserId = async (req, res) => {
    try {
        if (req.userInfo.id) {
            const userId = req.userInfo.id;
            const orderList = await OrderModel.find({
                userInfo: userId,
                isDelivered: false,
                isDeleted: false,
            })
                .populate({
                    path: "orderItems",
                    populate: {
                        path: "productId",
                        select: "name image primaryPrice",
                    },
                })
                .sort({
                    createdAt: -1,
                });
            res.status(200).json(orderList);
        } else {
            res.status(404).json({ error: "getOrdersByUserId userId Invalid" });
        }
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const getDeliveredOrdersByUserId = async (req, res) => {
    try {
        if (req.userInfo.id) {
            const userId = req.userInfo.id;
            const orderList = await OrderModel.find({
                userInfo: userId,
                isDelivered: true,
                isDeleted: false,
            })
                .populate({
                    path: "orderItems",
                    populate: {
                        path: "productId",
                        select: "name image primaryPrice",
                    },
                })
                .sort({
                    createdAt: -1,
                });
            res.status(200).json(orderList);
        } else {
            res.status(404).json({ error: "getOrdersByUserId userId Invalid" });
        }
    } catch (err) {
        res.status(500).json({ error: err });
    }
};
