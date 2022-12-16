import { isAuth } from "../vendor/index.js";
import express from "express";
import {
    addComment,
    createInitComment,
} from "../controllers/commentController.js";

const commentsRouter = express.Router();
commentsRouter.post("/addComment", isAuth, addComment);
commentsRouter.post("/init", createInitComment);

export default commentsRouter;
