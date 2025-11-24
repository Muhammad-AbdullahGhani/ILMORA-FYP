import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
export const connectMongo = async uri => {
  const mongoUri = uri || process.env.MONGO_URI || 'mongodb://localhost:27017/ilm-ora';
  try {
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    throw err;
  }
};