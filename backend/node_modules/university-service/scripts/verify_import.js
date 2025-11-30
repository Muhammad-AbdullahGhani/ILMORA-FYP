import mongoose from 'mongoose';
import { University } from '../src/models/University.js';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://abdullahghani:1234@cluster0.ehehitv.mongodb.net/university-reviews?retryWrites=true&w=majority";

async function verify() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        const uniCount = await University.countDocuments();
        console.log(`Total Universities: ${uniCount}`);

        const universities = await University.find({}, 'name programs');
        let totalPrograms = 0;
        universities.forEach(u => {
            totalPrograms += u.programs.length;
        });
        console.log(`Total Programs: ${totalPrograms}`);

        if (uniCount > 0) {
            console.log('Sample University:', JSON.stringify(universities[0], null, 2));
        }

        process.exit(0);
    } catch (error) {
        console.error('Verification failed:', error);
        process.exit(1);
    }
}

verify();
