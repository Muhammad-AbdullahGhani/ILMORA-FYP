import { Router } from 'express';
import { proxyRequest } from '../middleware/proxyHandler.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

// Public routes
router.post('/register', proxyRequest('auth', '/api/auth/register'));
router.post('/login', proxyRequest('auth', '/api/auth/login'));
router.post('/forgot-password', proxyRequest('auth', '/api/auth/forgot-password'));
router.post('/reset-password/:token', proxyRequest('auth', '/api/auth/reset-password/:token'));

// Protected routes
router.get('/me', authMiddleware, proxyRequest('auth', '/api/auth/me'));
router.put('/profile', authMiddleware, proxyRequest('auth', '/api/auth/profile'));
router.post('/logout', authMiddleware, proxyRequest('auth', '/api/auth/logout'));
router.post('/change-password', authMiddleware, proxyRequest('auth', '/api/auth/change-password'));

export default router;
