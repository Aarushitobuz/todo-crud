import { Request, Response, NextFunction } from 'express';
import User from '../../models/User';

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ error: "User not found." });
        }
        res.json({ message: "User successfully deleted." });
    } catch (err) {
        next(err);
    }
};