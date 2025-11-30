/**
 * Script to populate MongoDB with sample reviews for testing AI integration
 * Run: node populate_db.js
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Review from '../src/models/Review.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://abdullahghani:1234@cluster0.ehehitv.mongodb.net/university-reviews?retryWrites=true&w=majority';

const sampleReviews = [
    {
        reviewText: "The faculty is world-class and research opportunities are incredible. Best decision of my life!",
        factor: "Faculty",
        university: "NUST",
        city: "Islamabad",
        authorName: "Ahmed Khan",
        authorClass: "Class of 2024",
        rating: 0, // Will be predicted by AI
        isApproved: true
    },
    {
        reviewText: "Amazing campus life with great extracurricular activities and sports facilities.",
        factor: "Campus Life",
        university: "NUST",
        city: "Islamabad",
        authorName: "Sara Ali",
        authorClass: "Class of 2023",
        rating: 0,
        isApproved: true
    },
    {
        reviewText: "Excellent placement opportunities with top companies visiting campus regularly.",
        factor: "Placements",
        university: "NUST",
        city: "Islamabad",
        authorName: "Hassan Raza",
        authorClass: "Class of 2025",
        rating: 0,
        isApproved: true
    },
    {
        reviewText: "The academic curriculum is rigorous and prepares you well for industry.",
        factor: "Academics",
        university: "NUST",
        city: "Islamabad",
        authorName: "Fatima Noor",
        authorClass: "Class of 2022",
        rating: 0,
        isApproved: true
    },
    {
        reviewText: "Facilities could be better, some labs need upgrading.",
        factor: "Facilities",
        university: "NUST",
        city: "Islamabad",
        authorName: "Ali Hamza",
        authorClass: "Class of 2024",
        rating: 0,
        isApproved: true
    }
];

async function populateDatabase() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGO_URI);
        console.log('✓ Connected to MongoDB');

        // Clear existing reviews for NUST
        await Review.deleteMany({ university: 'NUST' });
        console.log('✓ Cleared existing NUST reviews');

        // Insert sample reviews
        const inserted = await Review.insertMany(sampleReviews);
        console.log(`✓ Inserted ${inserted.length} sample reviews`);

        console.log('\n' + '='.repeat(60));
        console.log('SUCCESS! Database populated with sample reviews');
        console.log('='.repeat(60));
        console.log('\nYou can now:');
        console.log('1. Navigate to the university page in your frontend');
        console.log('2. The frontend will fetch these reviews from MongoDB');
        console.log('3. Your AI model will analyze them in real-time!');
        console.log('\nTest URL: http://localhost:3000/universities/NUST');

        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

populateDatabase();
