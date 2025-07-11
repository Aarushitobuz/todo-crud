import { Request, Response, NextFunction } from 'express';
import validator from 'validator';
import User from '../../models/User';

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