import {Request, Response, NextFunction} from 'express';
import Todo from '../../models/Todo';
import { AuthenticatedRequest } from '../../middleware/auth';

export const createTodo = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const {title, description} = req.body
        const userId = req.user?.userId;
        if (!userId) {
            return res.status(400).json({ error: 'userId is required' });
        }
        const newTodo = new Todo({title, description, userId});
        const savedTodo = await newTodo.save();
        res.status(201).json(savedTodo);
    } catch(err) {
        next(err);
    }
};