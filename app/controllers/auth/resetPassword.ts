import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../../models/User';

const RESET_PASSWORD_SECRET = process.env.RESET_PASSWORD_SECRET;
if (!RESET_PASSWORD_SECRET) {
    throw new Error("Missing RESET_PASSWORD_SECRET in environment variables");
}

export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
        return res.status(400).json({ error: 'Token and new password are required' });
    }

  try {
        const decoded = jwt.verify(token, RESET_PASSWORD_SECRET) as { userId: string };
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(404).json({ error: 'Invalid or expired token' });
        }

        user.password = newPassword;
        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;

        await user.save();

        return res.status(200).json({ message: 'Password reset successful' });
  } catch (err) {
        console.error('Reset token verification failed:', err);
        return res.status(400).json({ error: 'Invalid or expired token' });
    }
};
