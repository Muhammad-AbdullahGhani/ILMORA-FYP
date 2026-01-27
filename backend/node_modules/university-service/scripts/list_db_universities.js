
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { University } from '../src/models/University.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ilm-ora';

async function listUniversities() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB');

        const universities = await University.find({}, 'name apiName');
        console.log('Universities in DB:');
        universities.forEach(u => {
            console.log(`- Name: "${u.name}", API Name: "${u.apiName || 'N/A'}", ID: ${u._id}`);
        });

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await mongoose.disconnect();
    }
}

listUniversities();
