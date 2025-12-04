import express from 'express';
import { listUniversities, getUniversity, getUniversityPrograms } from '../controllers/universityController.js';

const router = express.Router();

router.get('/', listUniversities);
router.get('/:id', getUniversity);
router.get('/:id/programs', getUniversityPrograms);

export default router;