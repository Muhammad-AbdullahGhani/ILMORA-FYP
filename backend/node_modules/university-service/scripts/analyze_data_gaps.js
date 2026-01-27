
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { University } from '../src/models/University.js';
import Review from '../src/models/Review.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const MONGO_URI = process.env.MONGO_URI;

async function analyzeGaps() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Connected to MongoDB");

        // 1. Find Universities with NO Reviews
        const allUnis = await University.find({}, 'name apiName');
        const unisWithNoReviews = [];

        for (const uni of allUnis) {
            // Check by name and apiName
            const count = await Review.countDocuments({
                $or: [
                    { university: uni.name },
                    { university: uni.apiName }
                ]
            });

            if (count === 0) {
                unisWithNoReviews.push(uni.name);
            }
        }

        const report = [];
        report.push(`--- Universities with 0 Reviews (${unisWithNoReviews.length}) ---`);
        unisWithNoReviews.forEach(u => report.push(`- ${u}`));

        // 2. Find Reviews with NO University Profile
        const reviewUniNames = await Review.distinct('university');
        const missingProfiles = [];

        for (const rName of reviewUniNames) {
            const uni = await University.findOne({
                $or: [
                    { name: rName },
                    { apiName: rName }
                ]
            });

            if (!uni) {
                missingProfiles.push(rName);
            }
        }

        report.push(`\n--- Reviews with Missing University Profiles (${missingProfiles.length}) ---`);
        missingProfiles.forEach(u => report.push(`- ${u}`));

        const fs = await import('fs');
        fs.writeFileSync('gaps_report.txt', report.join('\n'));
        console.log('Report written to gaps_report.txt');

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await mongoose.disconnect();
    }
}

analyzeGaps();
