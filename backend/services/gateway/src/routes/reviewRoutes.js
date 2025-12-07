import { Router } from 'express';
import { proxyRequest } from '../middleware/proxyHandler.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

// Public review routes
router.get('/', proxyRequest('university', '/api/reviews'));
router.get('/:universityName', proxyRequest('university', '/api/reviews/:universityName'));
// Sentiment analysis can take longer due to ML model processing
router.get('/:universityName/stats', proxyRequest('university', '/api/reviews/:universityName/stats', { timeout: 90000 })); // 90 seconds

// Protected review routes
router.post('/', authMiddleware, proxyRequest('university', '/api/reviews'));
router.post('/:reviewId/like', authMiddleware, proxyRequest('university', '/api/reviews/:reviewId/like'));

export default router;
