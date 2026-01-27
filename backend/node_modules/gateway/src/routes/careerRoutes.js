import { Router } from 'express';
import { proxyRequest } from '../middleware/proxyHandler.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

// Public routes
router.get('/', proxyRequest('career', '/api/careers'));
router.get('/search', proxyRequest('career', '/api/careers/search'));
router.get('/stats', proxyRequest('career', '/api/careers/stats'));
router.get('/:id', proxyRequest('career', '/api/careers/:id'));
router.get('/category/:category', proxyRequest('career', '/api/careers/category/:category'));

// Protected routes
router.post('/:id/save', authMiddleware, proxyRequest('career', '/api/careers/:id/save'));
router.get('/user/saved', authMiddleware, proxyRequest('career', '/api/careers/user/saved'));

export default router;
