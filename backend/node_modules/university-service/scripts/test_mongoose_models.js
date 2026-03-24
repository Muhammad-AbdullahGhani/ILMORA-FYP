import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: __dirname + '/../.env' });

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://abdullahghani:1234@cluster0.ehehitv.mongodb.net/university-reviews?retryWrites=true&w=majority";

const escapeRegExp = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

async function testBackend() {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to DB!');

    // Import the exact models from backend
    const { default: Review } = await import('../src/models/Review.js');
    const { default: University } = await import('../src/models/University.js');

    const university = "Air University";

    const sanitizedName = escapeRegExp(university).replace(/[\s\-]+/g, '[\\s\\-]+');
    console.log(`Using regex: ^${sanitizedName}$`);

    const query = {
        university: { $regex: new RegExp(`^${sanitizedName}$`, 'i') },
        isApproved: true
    };

    const count = await Review.countDocuments(query);
    console.log('Total count from Review.countDocuments:', count);

    const reviews = await Review.find(query)
        .sort({ createdAt: -1 })
        .limit(30)
        .lean();
    console.log('Total returned by Review.find:', reviews.length);

    process.exit(0);
}

testBackend().catch(console.error);
