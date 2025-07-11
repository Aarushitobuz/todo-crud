import {Request, Response, NextFunction} from 'express';
import Todo from '../../models/Todo';
import { AuthenticatedRequest } from '../../middleware/auth'

export const deleteTodo = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id; 
        const userId = req.user?.userId;
        if(!userId) {
            res.status(404).json({error: 'User not found'});
            return;
        }
        const deleted = await Todo.findByIdAndDelete({_id: id, userId});
        if(!deleted) {
            res.status(404).json({error: 'Todo not found'});
            return;
        }
        res.status(200).json({message: 'Todo successfully deleted'});
    } catch(err) {
        next(err);
    }
}