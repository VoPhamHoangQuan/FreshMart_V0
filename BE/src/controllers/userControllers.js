import UserModel from "../models/UserModel.js";
import { hashSync, compareSync } from "bcrypt";
import { data } from "../data.js";
import { jwtGenerator } from "../vendor/index.js";

export const initUser = async (req, res) => {
    try {
        // await UserModel.remove({});
        const initUserList = await UserModel.insertMany(data.users);
        res.status(200).json(initUserList);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getUser = async (req, res) => {
    try {
        const users = await UserModel.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const createUser = async (req, res) => {
    try {
        const userData = req.body;
        const password = hashSync(req.body.password, 8);
        const hashedData = { ...userData, password: password };
        const user = new UserModel(hashedData);
        await user.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const existedPhone = async (req, res) => {
    try {
        const existedUser = await UserModel.findOne({ phone: req.body.phone });

        existedUser
            ? res.status(200).json({ info: existedUser, existed: true })
            : res.status(200).json({ info: existedUser, existed: false });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const signinUser = async (req, res) => {
    try {
        const existedUser = await UserModel.findOne({ phone: req.body.phone });
        if (existedUser) {
            if (compareSync(req.body.password, existedUser.password)) {
                res.status(200).json({
                    name: existedUser.name,
                    gender: existedUser.gender,
                    phone: existedUser.phone,
                    isAdmin: existedUser.isAdmin,
                    token: jwtGenerator(existedUser),
                });
            } else {
                res.status(400).json({ error: "Pass Word incorrect" });
            }
        } else {
            res.status(400).json({ error: "Phone not exist" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
