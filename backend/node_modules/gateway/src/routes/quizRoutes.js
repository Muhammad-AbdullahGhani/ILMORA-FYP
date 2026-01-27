import { Router } from 'express';
import { proxyRequest } from '../middleware/proxyHandler.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

// Quiz adaptive session routes
router.post('/start', proxyRequest('quiz', '/api/quiz/start'));
router.post('/answer', proxyRequest('quiz', '/api/quiz/answer'));
router.post('/back', proxyRequest('quiz', '/api/quiz/back'));  // NEW: Back navigation
router.post('/finish/:sessionId', proxyRequest('quiz', '/api/quiz/finish/:sessionId'));
router.get('/results/:sessionId', proxyRequest('quiz', '/api/quiz/results/:sessionId'));
router.get('/history/:userId', proxyRequest('quiz', '/api/quiz/history/:userId'));  // NEW: User history

export default router;
