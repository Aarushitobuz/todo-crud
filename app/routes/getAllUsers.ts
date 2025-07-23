import express, { Request, Response, NextFunction } from 'express';
import { getAllUsers } from '../controllers/user/getAllUsers';
import { getUser } from '../controllers/user/getUser';
import { authenticate } from '../middleware/auth'

const router = express.Router();
router.get('/all-users', authenticate,(req: Request, res:Response, next:NextFunction) => {
    getAllUsers(req, res, next).catch(next);
});
router.get('/getuser', authenticate,(req: Request, res:Response, next:NextFunction) => {
    getUser(req, res, next).catch(next);
});

export default router;