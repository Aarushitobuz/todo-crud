import express, { Request, Response, NextFunction } from 'express';
import { getAllUsers } from '../controllers/user/getAllUsers';
import { authenticate } from '../middleware/auth'

const router = express.Router();
router.get('/all-users', authenticate,(req: Request, res:Response, next:NextFunction) => {
    getAllUsers(req, res, next).catch(next);
});

export default router;