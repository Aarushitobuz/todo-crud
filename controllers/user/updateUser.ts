import { Request, Response, NextFunction } from 'express';
import validator from 'validator';
import User from '../../models/User';
import { AuthenticatedRequest } from '../../middleware/auth';

export const updateUser = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.userId;
        if(!userId) {
            return res.status(400).json({ error: 'userId is required' });   
        };
        const { name, email } = req.body;
        const user = await User.findById(userId);
        if(!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        if(name) {
            user.name = name;
        }
        if(email) {
            if(!validator.isEmail(email)) {
                return res.status(400).json({ error: 'Invalid Email Address'});
            }
            user.email = email;
        }
        const updateUser = await user.save();
        res.status(200).json(updateUser);
    } catch (err) {
        next(err);
    }
};
