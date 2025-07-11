import {Request, Response, NextFunction} from 'express';
import Todo from '../../models/Todo';
import { AuthenticatedRequest } from '../../middleware/auth';

export const getTodoById = async(req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try{
        const { id } = req.params;
        const userId = req.user?.userId;
        if(!userId) {
            res.status(400).json({error: 'UserId is required'});
            return;
        }
        const todo  = await Todo.findOne({ _id: id, userId });
        if(!todo) {
            res.status(404).json({error: 'Todo not found'});
            return;
        }
        res.status(200).json(todo);
    } catch(err) {
        next(err);
    }
}