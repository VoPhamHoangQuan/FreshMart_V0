import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
            default: "product name",
        },
        description: {
            type: String,
            require: true,
            default: "product description",
        },
        category: {
            type: String,
            require: true,
            default: "product category",
        },
        image: {
            type: String,
            require: true,
            default: "product image",
        },
        primaryPrice: {
            type: Number,
            require: true,
            default: 0,
        },
        oldPrice: {
            type: Number,
            require: true,
            default: 0,
        },
        origin: {
            type: String,
            require: true,
            default: "product origin",
        },
        brand: {
            type: String,
            default: "product brand",
        },
        weight: {
            type: String,
            default: "product weight",
        },
        exp: {
            type: String,
            require: true,
            default: "xx/xx/xxxx",
        },
        stock: {
            type: Number,
            require: true,
            default: 0,
        },
        isDeleted: {
            type: Boolean,
            require: true,
            default: false,
        },
        commentsId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comments",
            require: false,
            default: null,
        },
    },
    { timestamps: true }
);

const ProductsModel = mongoose.model("Products", schema);

export default ProductsModel;
