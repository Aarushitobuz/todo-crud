import jwt from 'jsonwebtoken';

export function generateResetToken(userId: string) : string {
    return jwt.sign({ userId },process.env.JWT_SECRET!, {
        expiresIn: '15m',
    });
}