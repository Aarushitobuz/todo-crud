import express, { Request, Response, NextFunction } from 'express';
import { getTodoById } from '../controllers/todo/getTodoById';
import { authenticate } from '../middleware/auth';

const router = express.Router();
router.get('/todos/:id', authenticate, (req: Request, res: Response, next: NextFunction) => {
    getTodoById(req, res, next).catch(next);
});
export default router;