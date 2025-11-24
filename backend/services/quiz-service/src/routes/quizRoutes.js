import { Router } from 'express';
import { getQuiz } from '../controllers/quizController';
const router = Router();
router.get('/', getQuiz);
export default router;