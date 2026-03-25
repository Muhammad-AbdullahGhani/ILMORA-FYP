import express from 'express';
import { listUniversities, getUniversity, getUniversityPrograms, getUniversityScholarships } from '../controllers/universityController.js';
import { getNearbyHostels } from '../controllers/hostelController.js';

const router = express.Router();

router.get('/', listUniversities);
router.get('/:id', getUniversity);
router.get('/:id/programs', getUniversityPrograms);
router.get('/:id/scholarships', getUniversityScholarships);
router.get('/:id/hostels/nearby', getNearbyHostels);

export default router;