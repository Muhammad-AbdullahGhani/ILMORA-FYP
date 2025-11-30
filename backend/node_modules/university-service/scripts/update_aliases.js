import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { University } from '../src/models/University.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://abdullahghani:1234@cluster0.ehehitv.mongodb.net/university-reviews?retryWrites=true&w=majority";

async function updateAliases() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB');

        // Update NUST
        const nust = await University.findOne({ name: /National University of Science & Technology/i });
        if (nust) {
            console.log(`Found NUST: ${nust.name}`);
            nust.apiName = 'NUST';
            await nust.save();
            console.log('Updated NUST apiName to "NUST"');
        } else {
            console.log('NUST not found');
        }

        // Update FAST
        const fast = await University.findOne({ name: /FAST/i });
        if (fast) {
            console.log(`Found FAST: ${fast.name}`);
            fast.apiName = 'FAST';
            await fast.save();
            console.log('Updated FAST apiName to "FAST"');
        }

        // Update LUMS
        const lums = await University.findOne({ name: /Lahore University of Management Sciences/i });
        if (lums) {
            console.log(`Found LUMS: ${lums.name}`);
            lums.apiName = 'LUMS';
            await lums.save();
            console.log('Updated LUMS apiName to "LUMS"');
        }

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await mongoose.disconnect();
    }
}

updateAliases();
