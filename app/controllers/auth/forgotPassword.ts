import { Request, Response, NextFunction } from 'express';
import User from '../../models/User';
import { generateResetToken } from '../../utils/generateToken';
import sendEmail from '../../utils/sendEmail';

export const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(200).json({ message: 'If an account with that email exists, a reset link has been sent.' });
        }
        const token = generateResetToken(user.id);
        const resetUrl = `${process.env.FRONTEND_URL}/auth/reset-password?token=${token}`;
        const message = `
            <h3>Password Reset Request</h3>
            <p>You requested a password reset. Click the link below to reset your password:</p>
            <a href="${resetUrl}">${resetUrl}</a>
            <p>This link will expire in 15 minutes.</p>
        `;
        await sendEmail(user.email, 'Reset Your Password', message);
        return res.status(200).json({ message: 'If an account with that email exists, a reset link has been sent.' });
    } catch (err) {
        next(err);
    }
};
