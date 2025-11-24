import { Router } from 'express';
import { recommend } from '../controllers/recommendationController';
const router = Router();
router.get('/', recommend);
export default router;