import {Request, Response, NextFunction} from 'express';
import Todo from '../../models/Todo';
import { AuthenticatedRequest } from '../../middleware/auth';

export const updateTodo = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params;
        const {title, description, completed} = req.body;
        const userId = req.user?.userId
        // const todo = await Todo.findById(id);
        if(!userId) {
            res.status(404).json({error: 'User not found'});
            return;
        }
        const todo = await Todo.findOne({_id: id, userId});
        if(!todo) {
            res.status(404).json({error: 'Todo not found'});
            return;
        }
        if(title!== undefined) {
            todo.title = title;
        }
        if(description!== undefined) {
            todo.description = description;
        }
        if(completed!== undefined) {
            todo.completed = completed;
        }
        const updatedTodo = await todo.save();
        res.status(200).json(updatedTodo);
    } catch(err) {
        next(err);
    }
}