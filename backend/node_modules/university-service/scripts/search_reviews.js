import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://abdullahghani:1234@cluster0.ehehitv.mongodb.net/university-reviews?retryWrites=true&w=majority";

const reviewSchema = new mongoose.Schema({
    university: String
}, { strict: false });

const Review = mongoose.model('Review', reviewSchema);

async function searchUniversities() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB');

        const matches = await Review.distinct('university', { university: /National/i });
        console.log('Universities matching "National":', matches);

        const nustMatches = await Review.distinct('university', { university: /NUST/i });
        console.log('Universities matching "NUST":', nustMatches);

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await mongoose.disconnect();
    }
}

searchUniversities();
