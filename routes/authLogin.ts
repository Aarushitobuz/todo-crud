import express, { Request, Response, NextFunction } from 'express';
import { loginUser } from '../controllers/auth/login';
const router = express.Router();

router.post('/auth/login', (req: Request, res: Response, next: NextFunction) => {
    loginUser(req, res, next).catch(next); 
});
export default router;