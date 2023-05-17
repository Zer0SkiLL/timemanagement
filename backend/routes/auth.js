import express from 'express';
import { register, registerVerification, login } from '../controllers/authController.js';
import { whitelist } from '../middleware/whitelist.js';
import { isVerified } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', whitelist, register);
router.get('/register/verification/:token', registerVerification);

router.post('/login', isVerified, login);

export default router;
