import express , { Request, Response, NextFunction } from 'express';
import { updateUser } from '../controllers/userController';

const router = express.Router();
router.put('/users/:id', (req: Request, res: Response, next: NextFunction) => {
    updateUser(req, res, next).catch(next);
});

export default router;