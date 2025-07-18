import express from 'express';
import { resetPassword } from '../controllers/auth/resetPassword';

const router = express.Router();
router.post('/reset-password', resetPassword);

export default router;