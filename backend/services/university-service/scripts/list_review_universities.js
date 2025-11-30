import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://abdullahghani:1234@cluster0.ehehitv.mongodb.net/university-reviews?retryWrites=true&w=majority";

const reviewSchema = new mongoose.Schema({
    university: String
}, { strict: false });

const Review = mongoose.model('Review', reviewSchema);

async function listUniversities() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB');

        const universities = await Review.distinct('university');
        console.log('--- DISTINCT UNIVERSITIES IN REVIEWS ---');
        universities.forEach(u => console.log(`"${u}"`));
        console.log('----------------------------------------');

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await mongoose.disconnect();
    }
}

listUniversities();
