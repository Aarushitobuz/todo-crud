import { Request, Response, NextFunction } from 'express';
import User from '../../models/User';
import { AuthenticatedRequest } from '../../middleware/auth'

export const deleteUser = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized: userId is missing in the token' });
        }
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.status(200).json({ message: 'User successfully deleted' });
    } catch (err) {
        next(err);
    }
};