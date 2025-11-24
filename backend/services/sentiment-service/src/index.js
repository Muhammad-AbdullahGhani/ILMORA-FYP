import express from 'express';
const app = express();
app.get('/health', (_req, res) => res.json({
  status: 'ok'
}));
const port = process.env.PORT || 3004;
app.listen(port, () => console.log(`sentiment-service listening on ${port}`));