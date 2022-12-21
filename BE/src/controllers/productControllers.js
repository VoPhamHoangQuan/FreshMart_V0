import ProductsModel from "../models/ProductModel.js";
import { data } from "../data.js";
import { productData } from "../extraProductdata.js";

export const initProducts = async (req, res) => {
    try {
        // await ProductsModel.remove();
        const products = await ProductsModel.insertMany(productData.products);
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const getProducts = async (req, res) => {
    try {
        const productList = await ProductsModel.find({
            isDeleted: false,
        }).populate("commentsId");
        res.status(200).send(productList);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const addProduct = async (req, res) => {
    try {
        const newProduct = req.body;
        const product = new ProductsModel(newProduct);
        await product.save();
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const getProductDetail = async (req, res) => {
    try {
        const productDetail = await ProductsModel.findById(
            req.params.id
        ).populate({
            path: "commentsId",
            populate: {
                path: "comments.userId",
                select: "name gender image",
            },
        });
        res.status(200).send(productDetail);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const adjustProductInStock = async (req, res) => {
    try {
        const filter = { _id: req.body.productId };
        const update = { stock: req.body.updatedStock };
        const productBefore = await ProductsModel.findOneAndUpdate(
            filter,
            update
        );
        res.status(200).send({ message: "update product stock success" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const getProductListBySearchName = async (req, res) => {
    try {
        const searchString = req.params.key;
        const listProduct = await ProductsModel.find({
            $and: [
                {
                    $or: [
                        { name: { $regex: searchString } },
                        { category: { $regex: searchString } },
                        { description: { $regex: searchString } },
                        { origin: { $regex: searchString } },
                        { brand: { $regex: searchString } },
                    ],
                },
                {
                    isDeleted: false,
                },
            ],
        }).populate("commentsId");
        res.status(200).send(listProduct);
    } catch (err) {
        res.satus(500).json({ error: err });
    }
};
