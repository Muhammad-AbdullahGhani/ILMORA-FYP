import { Router } from 'express';
import { listUniversities } from '../controllers/universityController';
const router = Router();
router.get('/', listUniversities);
export default router;