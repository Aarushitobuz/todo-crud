import express , { Request, Response, NextFunction } from 'express';
import { updateUser } from '../controllers/user/updateUser';

const router = express.Router();
router.put('/users/:id', (req: Request, res: Response, next: NextFunction) => {
    updateUser(req, res, next).catch(next);
});

export default router;