require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.MONGO_URI || 'mongodb+srv://abdullahghani:1234@cluster0.ehehitv.mongodb.net/university-reviews?retryWrites=true&w=majority';

async function checkDB() {
    await mongoose.connect(uri);
    const db = mongoose.connection.db;

    const unisToFind = ['Air', 'Bahria', 'CUST', 'GIKI'];

    for (const uniName of unisToFind) {
        const uni = await db.collection('universities').findOne({ name: { $regex: uniName, $options: 'i' } });
        if (uni) {
            console.log(`\n--- ${uniName} ---`);
            console.log(`DB Name: '${uni.name}'`);
            console.log(`apiName: '${uni.apiName}'`);

            const reviews = await db.collection('reviews').find({ factor: 'Job Support', university: { $regex: uniName, $options: 'i' } }).toArray();
            console.log(`Found ${reviews.length} injected Job Support reviews matching regex '${uniName}'`);
            for (const r of reviews) {
                console.log(`  -> Review university field: '${r.university}'`);
            }
        }
    }

    process.exit(0);
}

checkDB().catch(console.error);
