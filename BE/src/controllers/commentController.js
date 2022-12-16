import CommentsModel from "../models/CommentModel.js";
import ProductsModel from "../models/ProductModel.js";
import OrderModel from "../models/OrderModel.js";

export const createInitComment = async (req, res) => {
    try {
        const initComment = new CommentsModel({
            comments: [],
        });

        const createdInitComment = await initComment.save();
        const updatedProduct = await ProductsModel.findOneAndUpdate(
            {
                _id: req.body.productId,
            },
            {
                commentsId: createdInitComment._id,
            }
        );

        res.status(200).json({
            message: "Init comment created",
            initComment: updatedProduct,
        });
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const addComment = async (req, res) => {
    try {
        const isPaidProduct = IsPaidForProduct(
            req.userInfo.id,
            req.body.productId
        );
        isPaidProduct.then(async (data) => {
            if (data) {
                const product = await ProductsModel.findById(
                    req.body.productId
                ).populate("commentsId");
                const comment = await CommentsModel.findById(
                    product.commentsId._id
                );
                if (comment.comments.length > 0) {
                    let alreadyComment = false;
                    comment.comments.map((el) => {
                        if (el.userId.toString() === req.userInfo.id) {
                            alreadyComment = true;
                        }
                    });
                    if (alreadyComment) {
                        res.status(201).send("already comment");
                    } else {
                        comment.comments.push({
                            userId: req.userInfo.id,
                            message: req.body.message,
                            rate: req.body.rate,
                        });
                        await comment.save();
                        res.status(200).send("add comment success");
                    }
                } else {
                    comment.comments.push({
                        userId: req.userInfo.id,
                        message: req.body.message,
                        rate: req.body.rate,
                    });
                    await comment.save();
                    res.status(200).json({ message: "add comment success" });
                }
            } else {
                res.status(202).send("notPaid");
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const IsPaidForProduct = async (userId, productId) => {
    try {
        let productIsPaid = false;
        const userOrders = await OrderModel.find({
            userInfo: userId,
            isDeleted: false,
        });

        if (userOrders.length > 0) {
            for (let i of userOrders) {
                if (i.isPaid && !i.isDeleted) {
                    for (let j of i.orderItems) {
                        if (j.productId.toString() === productId) {
                            productIsPaid = true;
                            break;
                        }
                    }
                }
            }
            if (productIsPaid) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    } catch (err) {
        console.log(err.message);
        return false;
    }
};
