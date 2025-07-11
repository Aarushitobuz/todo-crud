import express, { Request , Response, NextFunction } from 'express';
import { updateTodo } from '../controllers/todo/updateTodo';
import { authenticate } from '../middleware/auth';

const router = express.Router();

router.put('/todos/:id', authenticate, (req: Request, res: Response, next: NextFunction) => {
    updateTodo(req, res, next).catch(next);
});
export default router;
