import express from 'express';
import { forgotPassword } from '../controllers/auth/forgotPassword';


const router = express.Router();
router.post('/forgot-password', forgotPassword);

export default router;
