import jwt from 'jsonwebtoken';

export function generateResetToken(userId: string): string {
    const RESET_PASSWORD_SECRET = process.env.RESET_PASSWORD_SECRET;
    if (!RESET_PASSWORD_SECRET) {
        throw new Error("Missing RESET_PASSWORD_SECRET ");
    }

    return jwt.sign({ userId }, RESET_PASSWORD_SECRET, {
        expiresIn: '15m',
    });
}