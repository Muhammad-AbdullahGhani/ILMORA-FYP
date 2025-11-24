import express from 'express';
const app = express();
app.get('/health', (_req, res) => res.json({
  status: 'ok'
}));
const port = process.env.PORT || 3002;
app.listen(port, () => console.log(`quiz-service listening on ${port}`));