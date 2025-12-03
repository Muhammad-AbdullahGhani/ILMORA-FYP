import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import reviewRoutes from './routes/reviewRoutes.js';
import universityRoutes from './routes/universityRoutes.js';
import { analyzeReviews, getModelStatus, loadModel } from './services/sentimentService.js';

// Load environment variables
dotenv.config();

const app = express();

// ==================== MIDDLEWARE ====================
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://abdullahghani:1234@cluster0.ehehitv.mongodb.net/university-reviews?retryWrites=true&w=majority";

async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
    console.warn('Running without database connection');
  }
}

// ==================== ROUTES ====================

// Review routes (CRUD operations)
app.use('/api/reviews', reviewRoutes);
app.use('/api/universities', universityRoutes);

// Legacy sentiment analysis endpoint (for batch analysis)
app.post('/sentiment/analyze', async (req, res) => {
  try {
    const { reviews = [] } = req.body;

    if (!Array.isArray(reviews) || reviews.length === 0) {
      return res.status(400).json({
        error: 'reviews array is required and must not be empty'
      });
    }

    // Validate review structure
    const invalidReviews = reviews.filter(r =>
      !r.review_text || !r.factor || !r.university || !r.city
    );

    if (invalidReviews.length > 0) {
      return res.status(400).json({
        error: 'Invalid review structure',
        message: 'Each review must have: review_text, factor, university, city',
        invalidCount: invalidReviews.length
      });
    }

    // Analyze reviews
    const stats = await analyzeReviews(reviews);

    res.json(stats);
  } catch (error) {
    console.error('Analyze error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
});

// Health check
app.get('/health', (_req, res) => {
  const modelStatus = getModelStatus();
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';

  res.json({
    status: 'ok',
    service: 'university-service',
    model: modelStatus,
    database: dbStatus,
    timestamp: new Date().toISOString()
  });
});

// Model status endpoint
app.get('/model/status', (_req, res) => {
  res.json(getModelStatus());
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not found',
    path: req.path,
    availableEndpoints: [
      'POST /api/reviews',
      'GET /api/reviews/:university',
      'GET /api/reviews/:university/stats',
      'POST /api/reviews/:reviewId/like',
      'DELETE /api/reviews/:reviewId',
      'POST /sentiment/analyze',
      'GET /health',
      'GET /model/status'
    ]
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: err.message
  });
});

// ==================== SERVER STARTUP ====================
const PORT = process.env.PORT || 3005;

async function startServer() {
  try {
    // Connect to database
    await connectDB();

    // Preload ML model
    console.log('Preloading sentiment model...');
    try {
      await loadModel();
    } catch (err) {
      console.warn('Model preload failed, will load on first request:', err.message);
    }

    // Start server
    app.listen(PORT, () => {
      console.log('='.repeat(60));
      console.log(`University Service running on http://localhost:${PORT}`);
      console.log('='.repeat(60));
      console.log('Available endpoints:');
      console.log('  POST   /api/reviews              - Create review');
      console.log('  GET    /api/reviews/:university  - Get reviews');
      console.log('  GET    /api/reviews/:university/stats - Get AI stats');
      console.log('  POST   /api/reviews/:id/like     - Like review');
      console.log('  DELETE /api/reviews/:id          - Delete review');
      console.log('  POST   /sentiment/analyze        - Batch analysis');
      console.log('  GET    /api/universities         - List universities');
      console.log('  GET    /api/universities/:id     - Get university details');
      console.log('  GET    /health                   - Health check');
      console.log('  GET    /model/status             - Model status');
      console.log('='.repeat(60));
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully...');
  await mongoose.connection.close();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('SIGINT received, shutting down gracefully...');
  await mongoose.connection.close();
  process.exit(0);
});

// Start the server
startServer();
