import express, { Request, Response, NextFunction }from 'express';
import { deleteUser } from '../controllers/user/deleteUser';
import { authenticate } from '../middleware/auth';

const router = express.Router();
router.delete('/users/:id', authenticate, (req: Request, res:Response ,next: NextFunction) => {
    deleteUser(req, res, next).catch(next);
});

export default router;