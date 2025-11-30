
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { University } from '../src/models/University.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const MONGO_URI = process.env.MONGO_URI;

async function verifyFix() {
    try {
        await mongoose.connect(MONGO_URI);

        const checks = [
            "National University Of Modern Languages",
            "Comsats University",
            "Capital University Of Science And Technology",
            "National University Of Computer And Emerging Sciences",
            "Quaid-e-azam University",
            "Riphah International University"
        ];

        for (const check of checks) {
            const uni = await University.findOne({ name: { $regex: check, $options: 'i' } });
            if (uni) {
                console.log(`Found "${uni.name}" -> apiName: "${uni.apiName}"`);
            } else {
                console.log(`Could not find university matching: ${check}`);
            }
        }

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await mongoose.disconnect();
    }
}

verifyFix();
