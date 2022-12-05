import express from "express";
import {
    getProducts,
    addProduct,
    initProducts,
    getProductDetail,
    adjustProductInStock,
    getProductListBySearchName,
} from "../controllers/productControllers.js";

const productRouter = express.Router();

productRouter.get("/init", initProducts);
productRouter.get("/", getProducts);
productRouter.post("/", addProduct);
productRouter.get("/product/:id", getProductDetail);
productRouter.post("/adjustProducIntStock", adjustProductInStock);
productRouter.get("/search/:key", getProductListBySearchName);

export default productRouter;
