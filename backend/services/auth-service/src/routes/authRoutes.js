// auth-service/src/routes/authRoutes.js
import { Router } from 'express';
import { login, register, verify } from '../controllers/authController.js';
const router = Router();
router.post('/login', login);
router.post('/register', register);
router.get('/verify', verify);
export default router;