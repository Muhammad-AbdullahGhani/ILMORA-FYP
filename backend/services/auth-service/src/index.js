// auth-service/src/index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import authRouter from './routes/authRoutes.js';
import { connectMongo } from './utils/connectMongo.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load auth-service environment variables from ../.env
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
app.use(cors());
app.use(express.json());

// JSON parse error handler (body-parser)
app.use((err, _req, res, next) => {
  if (err && err.type === 'entity.parse.failed') {
    return res.status(400).json({
      error: 'Invalid JSON body'
    });
  }
  next(err);
});
app.get('/health', (_req, res) => res.json({
  status: 'ok'
}));

// Mount auth routes under /api/auth
app.use('/api/auth', authRouter);
const port = process.env.PORT || 3008;
const start = async () => {
  try {
    // If Mongo is enabled or a URI is present, attempt connection first
    if (process.env.MONGO_ENABLED === 'true' || process.env.MONGO_URI) {
      console.log('Attempting to connect to MongoDB...');
      await connectMongo();
    }
    app.listen(port, () => console.log(`auth-service listening on ${port}`));
  } catch (err) {
    console.error('Failed to start auth-service:', err);
    process.exit(1);
  }
};
start();