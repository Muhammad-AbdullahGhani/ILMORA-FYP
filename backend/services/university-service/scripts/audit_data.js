
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

async function auditData() {
    try {
        await mongoose.connect(MONGO_URI);

        const output = [];
        output.push('--- UNIVERSITIES IN DB ---');
        const unis = await University.find({}, 'name apiName');
        unis.sort((a, b) => a.name.localeCompare(b.name)).forEach(u => {
            output.push(`Name: "${u.name}" | API: "${u.apiName || 'N/A'}"`);
        });

        fs.writeFileSync('full_audit.txt', output.join('\n'));
        console.log('Audit complete. Written to full_audit.txt');

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await mongoose.disconnect();
    }
}

auditData();
