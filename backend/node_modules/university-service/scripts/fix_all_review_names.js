import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://abdullahghani:1234@cluster0.ehehitv.mongodb.net/university-reviews?retryWrites=true&w=majority';

async function fixAllReviewNames() {
    await mongoose.connect(MONGO_URI);
    const db = mongoose.connection.db;

    console.log("--- Fixing ALL 3000 Reviews to Map to Exact API Names ---");

    const universities = await db.collection('universities').find({}).toArray();
    const allReviews = await db.collection('reviews').find({}).toArray();

    let totalFixed = 0;

    for (const review of allReviews) {
        const csvName = review.university;
        let newName = null;

        // First, try exact exact match (ignoring case)
        const exactMatch = universities.find(u =>
            u.name.toLowerCase() === csvName.toLowerCase() ||
            (u.apiName && u.apiName.toLowerCase() === csvName.toLowerCase())
        );

        if (exactMatch) {
            newName = exactMatch.apiName || exactMatch.name;
        } else {
            // Find a university that *contains* the CSV name, or where CSV name contains the UNI name
            // e.g., "Air University" is contained in "Air University, H-11..."
            const partialMatch = universities.find(u =>
                u.name.toLowerCase().includes(csvName.toLowerCase()) ||
                csvName.toLowerCase().includes(u.name.toLowerCase()) ||
                (u.apiName && (u.apiName.toLowerCase().includes(csvName.toLowerCase()) || csvName.toLowerCase().includes(u.apiName.toLowerCase())))
            );

            if (partialMatch) {
                newName = partialMatch.apiName || partialMatch.name;
            }
        }

        // Special hardcodes if mapping is weird
        if (csvName.includes('NUML') || csvName.includes('National University of Modern Languages')) {
            const numl = universities.find(u => u.name.includes('Modern Languages'));
            if (numl) newName = numl.apiName || numl.name;
        }
        if (csvName.includes('NUST') || csvName.includes('National University of Sciences')) {
            const nust = universities.find(u => u.name.includes('Sciences and Technology'));
            if (nust) newName = nust.apiName || nust.name;
        }
        if (csvName.includes('GIKI') || csvName.includes('Ghulam Ishaq')) {
            const giki = universities.find(u => u.name.includes('Ghulam Ishaq'));
            if (giki) newName = giki.apiName || giki.name;
        }
        if (csvName.includes('FAST') || csvName.includes('NUCES')) {
            const fast = universities.find(u => u.name.includes('National University of Computer'));
            if (fast) newName = fast.apiName || fast.name;
        }
        if (csvName.includes('Comsats') || csvName.includes('COMSATS')) {
            const comsats = universities.find(u => u.name.includes('COMSATS'));
            if (comsats) newName = comsats.apiName || comsats.name;
        }
        if (csvName.includes('Islamic') || csvName.includes('IIUI')) {
            const iiui = universities.find(u => u.name.includes('International Islamic'));
            if (iiui) newName = iiui.apiName || iiui.name;
        }

        if (newName && newName !== csvName) {
            await db.collection('reviews').updateOne(
                { _id: review._id },
                { $set: { university: newName } }
            );
            totalFixed++;
        }
    }

    console.log(`✅ Successfully aligned ${totalFixed} review names to EXACT backend expected strings.`);

    // Clear the cache one final time
    await db.collection('universities').updateMany({}, { $set: { cachedSentiment: {} } });
    console.log("Cleared cache to force recalculation.");

    process.exit(0);
}

fixAllReviewNames().catch(console.error);
