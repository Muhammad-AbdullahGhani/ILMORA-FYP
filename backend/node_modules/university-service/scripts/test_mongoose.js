import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
const uri = process.env.MONGO_URI || 'mongodb+srv://abdullahghani:1234@cluster0.ehehitv.mongodb.net/university-reviews?retryWrites=true&w=majority';

const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

async function testQuery() {
    await mongoose.connect(uri);
    const db = mongoose.connection.db;

    const universityName = 'Air University';
    const sanitizedName = escapeRegExp(universityName).replace(/[\s\-]+/g, '[\\s\\-]+');

    console.log(`Searching for regex: ^${sanitizedName}$`);

    // Test University collection match
    const uni = await db.collection('universities').findOne({
        $or: [
            { name: { $regex: new RegExp(`^${sanitizedName}$`, 'i') } },
            { apiName: { $regex: new RegExp(`^${sanitizedName}$`, 'i') } }
        ]
    });
    console.log('University match:', uni ? uni.name : 'NONE');

    // Test Review collection match
    const reviews = await db.collection('reviews').find({
        university: { $regex: new RegExp(`^${sanitizedName}$`, 'i') },
        isApproved: true
    }).toArray();

    console.log(`Found ${reviews.length} reviews for this exact regex.`);

    process.exit(0);
}

testQuery().catch(console.error);
