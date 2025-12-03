
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { University } from '../src/models/University.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const MONGO_URI = process.env.MONGO_URI;

async function debugFailed() {
    try {
        await mongoose.connect(MONGO_URI);

        const searchTerms = [
            "Army", "Beaconhouse", "Fatima", "Ghulam", "Quaid", "Rawalpindi", "Shaheed", "SZABIST"
        ];

        const report = [];
        for (const term of searchTerms) {
            report.push(`\nSearching for "${term}"...`);
            const results = await University.find({ name: { $regex: term, $options: 'i' } }, 'name apiName');
            results.forEach(u => report.push(`- "${u.name}" (apiName: ${u.apiName})`));
        }

        const fs = await import('fs');
        fs.writeFileSync('failed_matches_report.txt', report.join('\n'));
        console.log("Report written to failed_matches_report.txt");

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await mongoose.disconnect();
    }
}

debugFailed();
