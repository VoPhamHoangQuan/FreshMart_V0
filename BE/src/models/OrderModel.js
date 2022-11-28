import mongoose from "mongoose";

const schema = mongoose.Schema(
    {
        orderItems: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Products",
                    require: true,
                },
                qty: { type: Number, require: true },
            },
        ],
        shippingInfo: {
            address: { type: String, require: true },
            shippingPhone: { type: String },
            shipingPrice: { type: Number, require: true },
            itemsPrice: { type: Number, require: true },
        },
        paymentMethod: {
            type: String,
            require: true,
        },
        userInfo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
            require: true,
        },
        isPaid: { type: Boolean, default: false, require: true },
        paidAt: { type: Date },
        isDelivered: { type: Boolean, default: false, require: true },
        deliveredAt: { type: Date },
    },
    {
        timeStamps: true,
    }
);

const OrderModel = mongoose.model("Orders", schema);
export default OrderModel;
