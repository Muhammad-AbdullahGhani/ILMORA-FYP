import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ilm-ora';

const run = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    const reviews = mongoose.connection.collection('reviews');
    const universities = mongoose.connection.collection('universities');

    const result = await reviews.deleteMany({
      factor: 'Hostels',
      university: { $regex: '(Emerging Sciences|FAST|NUCES)', $options: 'i' },
      review_text: { $regex: 'students in .* often discuss this factor\\.', $options: 'i' }
    });

    await universities.updateMany(
      { name: { $regex: '(Emerging Sciences|FAST|NUCES)', $options: 'i' } },
      { $unset: { cachedSentiment: 1 }, $set: { lastUpdated: new Date() } }
    );

    console.log(`Deleted synthetic FAST/NUCES hostel reviews: ${result.deletedCount}`);
  } catch (error) {
    console.error('Failed to remove FAST hostel synthetic reviews:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

run();
