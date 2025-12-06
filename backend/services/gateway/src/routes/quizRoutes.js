import { Router } from 'express';
import { proxyRequest } from '../middleware/proxyHandler.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

// Quiz adaptive session routes
router.post('/start', proxyRequest('quiz', '/api/quiz/start'));
router.post('/answer', proxyRequest('quiz', '/api/quiz/answer'));
router.get('/results/:sessionId', proxyRequest('quiz', '/api/quiz/results/:sessionId'));
router.get('/finish/:sessionId', proxyRequest('quiz', '/api/quiz/finish/:sessionId'));

// Additional quiz routes
router.get('/', proxyRequest('quiz', '/api/quiz'));
router.get('/:id', proxyRequest('quiz', '/api/quiz/:id'));
router.post('/', authMiddleware, proxyRequest('quiz', '/api/quiz'));
router.post('/:id/submit', authMiddleware, proxyRequest('quiz', '/api/quiz/:id/submit'));
router.post('/:id/save-progress', authMiddleware, proxyRequest('quiz', '/api/quiz/:id/save-progress'));
router.get('/user/history', authMiddleware, proxyRequest('quiz', '/api/quiz/user/history'));
router.get('/user/results/:id', authMiddleware, proxyRequest('quiz', '/api/quiz/user/results/:id'));

export default router;
