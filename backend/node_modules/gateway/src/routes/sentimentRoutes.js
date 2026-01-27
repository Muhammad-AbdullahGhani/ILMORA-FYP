import { Router } from 'express';
import { proxyRequest } from '../middleware/proxyHandler.js';

const router = Router();

// Public routes - sentiment data is publicly accessible
router.get('/university/:id', proxyRequest('sentiment', '/api/sentiment/university/:id'));
router.get('/universities', proxyRequest('sentiment', '/api/sentiment/universities'));
router.get('/dashboard', proxyRequest('sentiment', '/api/sentiment/dashboard'));
router.get('/reviews/:universityId', proxyRequest('sentiment', '/api/sentiment/reviews/:universityId'));
router.post('/analyze', proxyRequest('sentiment', '/api/sentiment/analyze'));

export default router;
