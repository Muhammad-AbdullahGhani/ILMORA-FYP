import express from 'express';
import {
    createReview,
    getReviewsByUniversity,
    getReviewStats,
    likeReview,
    deleteReview,
    reportReview
} from '../controllers/reviewController.js';

const router = express.Router();

// Review CRUD routes
router.post('/', createReview);
router.get('/:university', getReviewsByUniversity);
router.get('/:university/stats', getReviewStats);

// Review interaction routes
router.post('/:reviewId/like', likeReview);
router.post('/:reviewId/report', reportReview);
router.delete('/:reviewId', deleteReview);

export default router;
