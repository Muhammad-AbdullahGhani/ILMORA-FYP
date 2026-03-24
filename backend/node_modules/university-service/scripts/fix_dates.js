import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const uri = process.env.MONGO_URI || 'mongodb+srv://abdullahghani:1234@cluster0.ehehitv.mongodb.net/university-reviews?retryWrites=true&w=majority';

async function fixDates() {
    await mongoose.connect(uri);
    const db = mongoose.connection.db;

    console.log("--- Fixing Injected Review 'createdAt' Dates (Node.js) ---");

    const now = new Date();

    const result = await db.collection('reviews').updateMany(
        {
            factor: { $in: ['Job Support', 'Resources', 'Hostels', 'Events'] }
        },
        {
            $set: { createdAt: now }
        }
    );

    console.log(`Updated ${result.modifiedCount} injected reviews with current Date object.`);

    // Clear cache
    await db.collection('universities').updateMany({}, { $set: { cachedSentiment: {} } });
    console.log("Cleared all sentiment caches.");

    process.exit(0);
}

fixDates().catch(console.error);
