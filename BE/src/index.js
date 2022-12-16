import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import productRouter from "./routers/productRouter.js";
import userRouter from "./routers/userRouter.js";
import orderRouter from "./routers/orderRouter.js";
import commentsRouter from "./routers/commentRouter.js";

dotenv.config();
const app = express();
const port = process.env.port || 5000;
const url =
    "mongodb+srv://admin:zuJluW4mJuopJCvF@cluster0.8knnuu2.mongodb.net/?retryWrites=true&w=majority";

mongoose
    .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("mongoDB connected");
        app.listen(
            port,
            console.log(`Server is running on: localhost:${port}`)
        );
    })
    .catch((error) => {
        console.log("error: " + error);
    });

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/products", productRouter);
app.use("/users", userRouter);
app.use("/orders", orderRouter);
app.use("/comments", commentsRouter);
