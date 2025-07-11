import express, { Request, Response, NextFunction } from 'express';
import { registerUser } from '../controllers/auth/register';
const router = express.Router();

router.post('/auth/register', (req: Request, res: Response, next: NextFunction) => {
    registerUser(req,res,next).catch(next);
});
export default router;