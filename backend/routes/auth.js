import express from 'express';
import {
  register,
  registerVerification,
  login,
  resetPasswordRequest,
  resetPassword,
} from '../controllers/authController.js';
import { whitelist } from '../middleware/whitelist.js';
import { isVerified } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', whitelist, register);
router.get('/register/verification/:token', registerVerification);

router.post('/login', isVerified, login);

router.post('/password-reset', resetPasswordRequest);
router.post('/password-reset/:token', resetPassword);

export default router;
