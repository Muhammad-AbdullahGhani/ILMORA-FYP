// src/routes/sentimentRoutes.ts
import { Router } from 'express';
import { SentimentController } from '../controllers/sentimentController';

const router = Router();
const controller = new SentimentController();

router.post('/analyze', (req, res) => controller.analyzeUniversity(req, res));

export default router;