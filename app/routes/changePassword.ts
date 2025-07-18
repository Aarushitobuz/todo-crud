import express, { Request, Response, NextFunction } from 'express';
import { changePassword } from '../controllers/user/changePassword';
import { authenticate } from '../middleware/auth';

const router = express.Router();
router.put('/change-password', authenticate, (req: Request, res: Response, next: NextFunction) => {
    changePassword(req, res, next).catch(next)
});
export default router;