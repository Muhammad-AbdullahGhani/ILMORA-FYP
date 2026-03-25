import { Router } from 'express';
import { proxyRequest } from '../middleware/proxyHandler.js';

const router = Router();

router.get('/near/:universityId', proxyRequest('university', '/api/universities/:universityId/hostels/nearby'));

export default router;
