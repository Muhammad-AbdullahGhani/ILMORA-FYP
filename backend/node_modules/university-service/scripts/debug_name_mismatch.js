
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { University } from '../src/models/University.js';
import Review from '../src/models/Review.js';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const MONGO_URI = process.env.MONGO_URI;

async function analyzeMismatches() {
    try {
        await mongoose.connect(MONGO_URI);

        // 1. Get all unique university names from Reviews
        const reviewUnis = await Review.distinct('university');

        // 2. Get all universities from University collection
        const dbUnis = await University.find({}, 'name apiName');

        // 3. Check for matches
        const reviewUniSet = new Set(reviewUnis);
        let matchedCount = 0;
        const unmatchedReviews = new Set(reviewUnis);

        for (const uni of dbUnis) {
            const nameMatch = reviewUniSet.has(uni.name);
            const apiMatch = uni.apiName && reviewUniSet.has(uni.apiName);

            if (nameMatch) {
                unmatchedReviews.delete(uni.name);
                matchedCount++;
            } else if (apiMatch) {
                unmatchedReviews.delete(uni.apiName);
                matchedCount++;
            }
        }

        const report = [];
        report.push(`Matched Universities: ${matchedCount}`);
        report.push(`Unmatched Review Names (Reviews exist but no linking University found):`);
        Array.from(unmatchedReviews).sort().forEach(name => {
            report.push(`- "${name}"`);
        });

        report.push("\n--- Potential Candidates for Linking ---");
        // Try to find fuzzy matches for the unmatched reviews
        for (const reviewName of unmatchedReviews) {
            // Simple inclusion check
            const candidates = dbUnis.filter(u =>
                u.name.toLowerCase().includes(reviewName.toLowerCase()) ||
                reviewName.toLowerCase().includes(u.name.toLowerCase()) ||
                // Check for acronyms (very basic)
                u.name.match(/\b(\w)/g).join('').toLowerCase().includes(reviewName.toLowerCase())
            );

            if (candidates.length > 0) {
                report.push(`Review Name: "${reviewName}" could match:`);
                candidates.forEach(c => report.push(`  -> "${c.name}" (Current apiName: ${c.apiName})`));
            }
        }

        fs.writeFileSync('mismatch_report.txt', report.join('\n'));
        console.log('Report written to mismatch_report.txt');

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await mongoose.disconnect();
    }
}

analyzeMismatches();
