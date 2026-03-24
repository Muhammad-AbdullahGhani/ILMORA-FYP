import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const uri = process.env.MONGO_URI || 'mongodb+srv://abdullahghani:1234@cluster0.ehehitv.mongodb.net/university-reviews?retryWrites=true&w=majority';

async function fixNames() {
    await mongoose.connect(uri);
    const db = mongoose.connection.db;

    console.log("--- Fixing Injected Review 'university' Strings (Node.js) ---");
    const unisToFix = ['Air', 'Bahria', 'CUST', 'FAST', 'Capital', 'GIKI'];

    for (const uniSearch of unisToFix) {
        // Find a normal, working review for this university
        const normalReview = await db.collection('reviews').findOne({
            factor: 'Faculty',
            university: { $regex: uniSearch, $options: 'i' }
        });

        if (normalReview) {
            const correctFrontendName = normalReview.university;
            console.log(`Correct frontend string for ${uniSearch}: '${correctFrontendName}'`);

            // Update all injected reviews
            const result = await db.collection('reviews').updateMany(
                {
                    factor: { $in: ['Job Support', 'Resources', 'Hostels'] },
                    university: { $regex: uniSearch, $options: 'i' }
                },
                { $set: { university: correctFrontendName } }
            );
            console.log(`  -> Fixed ${result.modifiedCount} injected reviews to use '${correctFrontendName}'`);
        } else {
            console.log(`No normal review found for ${uniSearch} to extract name from.`);
        }
    }

    // Clear cache
    await db.collection('universities').updateMany({}, { $set: { cachedSentiment: {} } });
    console.log("Cleared all sentiment caches.");

    process.exit(0);
}

fixNames().catch(console.error);
