import express, { Request, Response, NextFunction } from 'express';
import { createUser } from '../controllers/user/postUser';

const router = express.Router();
router.post('/users', (req: Request, res: Response, next: NextFunction) => {
  createUser(req, res, next).catch(next);
});

export default router;
