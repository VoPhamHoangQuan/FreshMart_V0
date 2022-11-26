import express from "express";
import {
    getProducts,
    addProduct,
    initProducts,
    getProductDetail,
} from "../controllers/productControllers.js";

const productRouter = express.Router();

productRouter.get("/init", initProducts);
productRouter.get("/", getProducts);
productRouter.post("/", addProduct);
productRouter.get("/product/:id", getProductDetail);

export default productRouter;
