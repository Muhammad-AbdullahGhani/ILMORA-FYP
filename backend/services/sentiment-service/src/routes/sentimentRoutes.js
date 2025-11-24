import { Router } from 'express';
import { analyze } from '../controllers/sentimentController';
const router = Router();
router.post('/', analyze);
export default router;