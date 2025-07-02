import express, { Request, Response, NextFunction }from 'express';
import { deleteUser } from '../controllers/userController';

const router = express.Router();
router.delete('/users/:id', (req: Request, res:Response ,next: NextFunction) => {
    deleteUser(req, res, next).catch(next);
});

export default router;