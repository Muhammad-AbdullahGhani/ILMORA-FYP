
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { University } from '../src/models/University.js';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const MONGO_URI = process.env.MONGO_URI;

const mappings = [
    { reviewName: "APCOMS", dbPattern: /Army Public College Of Management And Sciences/i },
    { reviewName: "Air University", dbPattern: /Air University, Islamabad/i },
    { reviewName: "BNU - Beaconhouse National University", dbPattern: /Beaconhouse National University/i },
    { reviewName: "COMSATS", dbPattern: /Comsats University Islamabad, Islamabad/i },
    { reviewName: "CUST", dbPattern: /Capital University Of Science And Technology/i },
    { reviewName: "FAST-NUCES", dbPattern: /National University Of Computer And Emerging Sciences/i },
    { reviewName: "Fatima Jinnah Women University (Rawalpindi)", dbPattern: /Fatima Jinnah Women University/i },
    { reviewName: "Foundation University Islamabad", dbPattern: /Foundation University, Islamabad/i },
    { reviewName: "GIKI (commuter students)", dbPattern: /Ghulam Ishaq Khan Institute/i },
    { reviewName: "NUML", dbPattern: /National University Of Modern Languages/i },
    { reviewName: "Pakistan Institute of Engineering and Applied Sciences (PIEAS)", dbPattern: /Pakistan Institute Of Engineering & Applied Sciences/i },
    { reviewName: "Quaid-i-Azam University", dbPattern: /Quaid-e-azam University/i },
    { reviewName: "Rawalpindi Medical University", dbPattern: /Rawalpindi Medical University/i },
    { reviewName: "Riphah International University", dbPattern: /Riphah International University, Islamabad/i },
    { reviewName: "SZABIST Islamabad", dbPattern: /Shaheed Zulfikar Ali Bhutto Institute Of Science And Technology/i }
];

async function fixNames() {
    try {
        await mongoose.connect(MONGO_URI);

        const report = [];
        for (const mapping of mappings) {
            const uni = await University.findOne({ name: mapping.dbPattern });
            if (uni) {
                report.push(`Updating "${uni.name}" -> apiName: "${mapping.reviewName}"`);
                uni.apiName = mapping.reviewName;
                await uni.save();
            } else {
                report.push(`Could not find university matching pattern: ${mapping.dbPattern}`);
            }
        }

        fs.writeFileSync('fix_report.txt', report.join('\n'));
        console.log("Update complete. Report written to fix_report.txt");

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await mongoose.disconnect();
    }
}

fixNames();
