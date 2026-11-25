import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { z } from 'zod';
import { getMe, login, logout } from '../controllers/authController.js';
import { protectAdmin } from '../middlewares/authMiddleware.js';
import { validateBody } from '../middlewares/validateMiddleware.js';

const router = Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 25,
  message: { success: false, message: 'Too many login attempts. Please wait 15 minutes.' },
});

const loginSchema = z.object({
  email: z.string().email('Valid email is required.'),
  password: z.string().min(4, 'Password is required.'),
});

router.post('/login', loginLimiter, validateBody(loginSchema), login);
router.post('/logout', logout);
router.get('/me', protectAdmin, getMe);

export default router;
