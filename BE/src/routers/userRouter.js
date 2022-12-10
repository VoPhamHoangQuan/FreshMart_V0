import express from "express";
import { isAuth } from "../vendor/index.js";
import {
    createUser,
    initUser,
    signinUser,
    existedPhone,
    getUser,
    updateUser,
} from "../controllers/userControllers.js";

const userRouter = express.Router();

userRouter.get("/init", initUser);
userRouter.get("/", getUser);
userRouter.post("/createUser", createUser);
userRouter.post("/existedPhone", existedPhone);
userRouter.post("/signin", signinUser);
userRouter.post("/updateUser", isAuth, updateUser);

export default userRouter;
