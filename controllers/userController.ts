import { Request, Response, NextFunction } from "express";
import validator from "validator";
import User from "../models/User";

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email } = req.body;
        if(!name || !email) {
            return res.status(400).json({ error: "Please provide both name and email." });
        }
        if(!validator.isEmail(email)) {
            return res.status(400).json({ error: "Invalid email address." });
        }
        const existingUser = await User.findOne({ $or: [{ name }, { email }] });
        if (existingUser) {
            return res.status(400).json({ error: "User with this name or email already exists." });
        }
        const newUser = new User({ name, email });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        next(err);
    }   
};

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
}

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }
        if (name) user.name = name;
        if (email) {
            if (!validator.isEmail(email)) {
                return res.status(400).json({ error: "Invalid email address." });
            }
            user.email = email;
        }
        const updatedUser = await user.save();
        res.status(200).json(updatedUser);
    } catch (err) {
        next(err);
    }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ error: "User not found." });
        }
        res.json({ message: "User successfully deleted." });
    } catch (err) {
        next(err);
    }
};
