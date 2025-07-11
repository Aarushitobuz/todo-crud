import express , { Request, Response, NextFunction } from 'express';
import { updateUser } from '../controllers/user/updateUser';
import { authenticate } from '../middleware/auth';

const router = express.Router();
router.put('/users/:id', authenticate, (req: Request, res: Response, next: NextFunction) => {
    updateUser(req, res, next).catch(next);
});

export default router;