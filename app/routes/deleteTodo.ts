import express, { Request, Response, NextFunction } from 'express';
import { deleteTodo } from '../controllers/todo/deleteTodo';
import { authenticate } from '../middleware/auth';

const router = express.Router();
router.delete('/todos/:id', authenticate, (req: Request, res: Response, next: NextFunction) => {
    deleteTodo(req, res, next).catch(next);
});
export default router;
