import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://abdullahghani:1234@cluster0.ehehitv.mongodb.net/university-reviews?retryWrites=true&w=majority";

const reviewSchema = new mongoose.Schema({
    university: String,
    reviewText: String,
    aiRating: Number
}, { strict: false });

const Review = mongoose.model('Review', reviewSchema);

async function checkReviews() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB');

        const universities = await Review.distinct('university');
        console.log('All Universities with reviews:', universities);

        const nustReviews = await Review.countDocuments({ university: { $regex: /NUST/i } });
        console.log(`Reviews matching 'NUST': ${nustReviews}`);

        const scienceReviews = await Review.countDocuments({ university: { $regex: /Science/i } });
        console.log(`Reviews matching 'Science': ${scienceReviews}`);

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await mongoose.disconnect();
    }
}

checkReviews();
