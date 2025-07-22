import express, { Request, Response, NextFunction } from 'express';
import upload from '../middleware/upload';
import { authenticate } from '../middleware/auth';
import { uploadProfilePicture } from '../controllers/user/uploadProfilePicture';

const router = express.Router();

router.put(
    '/users/:id/profile-picture',
    authenticate,
    upload.single('profilePicture'),
    (req: Request, res: Response, next: NextFunction) =>
        uploadProfilePicture(req, res, next).catch(next)
);

export default router;
