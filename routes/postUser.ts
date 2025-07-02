import express, { Request, Response, NextFunction } from 'express';
import { createUser } from '../controllers/userController';

const router = express.Router();
router.post('/users', (req: Request, res: Response, next: NextFunction) => {
  createUser(req, res, next).catch(next);
});

export default router;
