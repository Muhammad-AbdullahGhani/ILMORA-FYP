import express from 'express';
import universityRoutes from './routes/universityRoutes.js';
const app = express();

// Basic CORS for development so frontend can call this service directly
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

app.use('/api/universities', universityRoutes);

app.get('/health', (_req, res) => res.json({
  status: 'ok'
}));

const port = process.env.PORT || 3005;
app.listen(port, () => console.log(`university-service listening on ${port}`));