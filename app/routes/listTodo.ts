import express, {Response, NextFunction } from 'express';
import { listTodo } from '../controllers/todo/listTodo';
import { authenticate } from '../middleware/auth';

const router  = express.Router();
// router.get('/all-todos', (req: Request,res: Response, next: NextFunction) => {
//     listTodo(req, res, next).catch(next);
// });
router.get('/all-todos', authenticate, (req, res, next) => {
	listTodo(req, res, next).catch(next);
});

export default router;