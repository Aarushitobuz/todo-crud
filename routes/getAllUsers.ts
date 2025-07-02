import express, { Request, Response, NextFunction } from 'express';
import { getAllUsers } from '../controllers/userController';

const router = express.Router();
router.get('/all-users', (req: Request, res:Response, next:NextFunction) => {
    getAllUsers(req, res, next).catch(next);
});

export default router;