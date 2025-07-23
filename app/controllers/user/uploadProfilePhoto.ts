import { Request, Response, NextFunction } from 'express';
import User from '../../models/User';
import { AuthenticatedRequest } from '../../middleware/auth';

export const uploadProfilePhoto = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.userId;
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { profilePhoto: req.file.filename },
      { new: true }
    );

    res.status(200).json({ message: 'Profile photo updated', user });
  } catch (error) {
    next(error);
  }
};
