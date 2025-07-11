import { Request, Response, NextFunction } from 'express';
import User from '../../models/User';
import { AuthenticatedRequest } from '../../middleware/auth';

export const getAllUsers = async (req: AuthenticatedRequest, res: Response, next: NextFunction) =>{
    try {
        const users = await User.find().select('-password');
        res.status(200).json(users);
    } catch(err) {
        next(err);
    }
};