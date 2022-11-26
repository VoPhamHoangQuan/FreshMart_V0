import express from "express";
import {
    createUser,
    initUser,
    signinUser,
    existedPhone,
    getUser,
} from "../controllers/userControllers.js";

const userRouter = express.Router();

userRouter.get("/init", initUser);
userRouter.get("/", getUser);
userRouter.post("/createUser", createUser);
userRouter.post("/existedPhone", existedPhone);
userRouter.post("/signin", signinUser);

export default userRouter;
