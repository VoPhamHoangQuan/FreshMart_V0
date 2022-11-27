import mongoose from "mongoose";

const schema = mongoose.Schema(
    {},
    {
        timeStamps: true,
    }
);

const OrderModel = mongoose.model("Orders", schema);
export default OrderModel;
