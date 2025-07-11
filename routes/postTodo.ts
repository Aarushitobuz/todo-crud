import express, {Request, Response , NextFunction} from 'express';
import { createTodo } from '../controllers/todo/createTodo';
import { authenticate } from '../middleware/auth';

const router = express.Router();
// router.post('/todos', (req: Request, res: Response, next: NextFunction) =>{
//     createTodo(req,res,next).catch(next);
// });
router.post('/todos', authenticate, (req: Request, res: Response, next: NextFunction) => {
    createTodo(req, res, next).catch(next);
});
export default router;
