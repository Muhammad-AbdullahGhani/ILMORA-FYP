
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Review from '../src/models/Review.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const MONGO_URI = process.env.MONGO_URI;

async function debugReviews() {
    try {
        await mongoose.connect(MONGO_URI);

        const targetUnis = [
            "Al-khair University [ajk], Islamabad",
            "AL KHAIR UNIVERSITY [AJK], ISLAMABAD",
            "Bahria University, E-8 Campus, Islamabad",
            "BAHRIA UNIVERSITY, E 8 CAMPUS, ISLAMABAD",
            "Abasyn University (sub Campus), Islamabad",
            "ABASYN UNIVERSITY (SUB CAMPUS), ISLAMABAD"
        ];

        const report = [];
        report.push("--- Checking Reviews for Specific Names ---");
        for (const name of targetUnis) {
            const count = await Review.countDocuments({ university: name });
            report.push(`"${name}": ${count} reviews`);
        }

        report.push("\n--- Sample Reviews in DB ---");
        const samples = await Review.find({}).limit(5);
        samples.forEach(r => report.push(`Uni: "${r.university}"`));

        const fs = await import('fs');
        fs.writeFileSync('review_names_report.txt', report.join('\n'));
        console.log("Report written to review_names_report.txt");

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await mongoose.disconnect();
    }
}

debugReviews();
