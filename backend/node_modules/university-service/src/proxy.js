// Simple proxy to forward requests from Node.js backend to Python service
import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
app.use(cors());
app.use(express.json());

const PYTHON_SERVICE_URL = 'http://localhost:3005';

// Health check
app.get('/health', async (req, res) => {
    try {
        const response = await fetch(`${PYTHON_SERVICE_URL}/health`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Python service not available' });
    }
});

// Predict single review
app.post('/predict', async (req, res) => {
    try {
        const response = await fetch(`${PYTHON_SERVICE_URL}/predict`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body)
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Batch predict
app.post('/predict/batch', async (req, res) => {
    try {
        const response = await fetch(`${PYTHON_SERVICE_URL}/predict/batch`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body)
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = 3006;
app.listen(PORT, () => {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`🔗 Node.js Proxy Service running on http://localhost:${PORT}`);
    console.log(`📡 Forwarding to Python service at ${PYTHON_SERVICE_URL}`);
    console.log(`${'='.repeat(60)}\n`);
});
