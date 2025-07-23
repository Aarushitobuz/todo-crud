import { Request, Response, NextFunction } from 'express';
import User from '../../models/User';
import { AuthenticatedRequest } from '../../middleware/auth';

export const getUser = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.userId;
    const user = await User.findById(userId).select('name email ');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};
