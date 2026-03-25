import { Router } from 'express';
import { proxyRequest } from '../middleware/proxyHandler.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

// All recommendation routes require authentication
router.use(authMiddleware);

// Python recommendation service routes
router.post('/degrees', proxyRequest('recommendation', '/api/recommend/degrees'));

export default router;
