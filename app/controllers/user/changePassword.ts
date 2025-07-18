import { Request, NextFunction, Response } from 'express';
import User from '../../models/User';
import { AuthenticatedRequest } from '../../middleware/auth'; 

export const changePassword = async( req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.userId;
        const { oldPassword, newPassword } = req.body;
        if(!userId) {
            return res.status(400).json({message: 'unauthorized'});
        }
        const user = await User.findById(userId);
        if(!user) {
            return res.status(404).json({message: 'user not found'});
        }
        const isMatch = await user.comparePassword(oldPassword);
        if (!isMatch) {
            return res.status(401).json({message: 'Incorrect old password'});
        }
        user.password = newPassword;
        await user.save();
        res.status(200).json({messgae: 'password changed successfully'});
    } catch(err) {
        next(err);
    }
};