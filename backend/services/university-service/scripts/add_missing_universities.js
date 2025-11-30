
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { University } from '../src/models/University.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const MONGO_URI = process.env.MONGO_URI;

const missingUniversities = [
    {
        name: "Army Public College of Management and Sciences (APCOMS)",
        apiName: "APCOMS",
        location: "Rawalpindi",
        type: "Public",
        website: "http://apcoms.edu.pk"
    },
    {
        name: "Beaconhouse National University",
        apiName: "BNU - Beaconhouse National University",
        location: "Lahore", // Assuming Lahore based on common knowledge, or could be Islamabad campus
        type: "Private",
        website: "https://www.bnu.edu.pk"
    },
    {
        name: "Fatima Jinnah Women University",
        apiName: "Fatima Jinnah Women University (Rawalpindi)",
        location: "Rawalpindi",
        type: "Public",
        website: "https://fjwu.edu.pk"
    },
    {
        name: "Ghulam Ishaq Khan Institute of Engineering Sciences and Technology",
        apiName: "GIKI (commuter students)",
        location: "Topi",
        type: "Private",
        website: "https://giki.edu.pk"
    },
    {
        name: "Rawalpindi Medical University",
        apiName: "Rawalpindi Medical University",
        location: "Rawalpindi",
        type: "Public",
        website: "https://rmur.edu.pk"
    },
    {
        name: "Riphah International University, Rawalpindi Campus",
        apiName: "Riphah Rawalpindi Campus",
        location: "Rawalpindi",
        type: "Private",
        website: "https://riphah.edu.pk"
    },
    {
        name: "Shaheed Zulfikar Ali Bhutto Institute of Science and Technology (SZABIST), Islamabad",
        apiName: "SZABIST Islamabad",
        location: "Islamabad",
        type: "Private",
        website: "https://szabist-isb.edu.pk"
    }
];

async function addMissing() {
    try {
        await mongoose.connect(MONGO_URI);

        for (const uniData of missingUniversities) {
            const exists = await University.findOne({
                $or: [{ name: uniData.name }, { apiName: uniData.apiName }]
            });

            if (!exists) {
                console.log(`Adding: ${uniData.name}`);
                await University.create(uniData);
            } else {
                console.log(`Skipping (already exists): ${uniData.name}`);
                // Update apiName if needed
                if (exists.apiName !== uniData.apiName) {
                    console.log(`  -> Updating apiName to ${uniData.apiName}`);
                    exists.apiName = uniData.apiName;
                    await exists.save();
                }
            }
        }

        console.log("Missing universities added.");

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await mongoose.disconnect();
    }
}

addMissing();
