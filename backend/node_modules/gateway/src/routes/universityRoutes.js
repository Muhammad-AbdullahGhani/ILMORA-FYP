import { Router } from 'express';
import { proxyRequest } from '../middleware/proxyHandler.js';
import { authMiddleware, optionalAuth } from '../middleware/authMiddleware.js';

const router = Router();

// Public routes with optional auth for personalization
router.get('/', optionalAuth, proxyRequest('university', '/api/universities'));
router.get('/search', optionalAuth, proxyRequest('university', '/api/universities/search'));
router.get('/:id', optionalAuth, proxyRequest('university', '/api/universities/:id'));
router.get('/:id/programs', proxyRequest('university', '/api/universities/:id/programs'));
router.get('/:id/scholarships', proxyRequest('university', '/api/universities/:id/scholarships'));

// Protected routes
router.post('/:id/favorite', authMiddleware, proxyRequest('university', '/api/universities/:id/favorite'));
router.delete('/:id/favorite', authMiddleware, proxyRequest('university', '/api/universities/:id/favorite'));
router.get('/user/favorites', authMiddleware, proxyRequest('university', '/api/universities/user/favorites'));

export default router;
