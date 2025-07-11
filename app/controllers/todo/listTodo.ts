import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../../middleware/auth';
import Todo from '../../models/Todo';

export const listTodo = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            return res.status(400).json({ error: 'userId is required' });
        }
        const todos = await Todo.find({ userId });

        res.status(200).json(todos);
    } catch (err) {
        next(err);
    }
};
