# Quick Frontend Test Guide

## Services Running

1. **Python Sentiment Service** (Port 3005)
   - Status: ✅ Running
   - Model: AbdullahGhani/Unidatamodel
   - Endpoint: http://localhost:3005/predict

## Start Frontend

```bash
cd C:\Users\i222683AbdullahGhani\Desktop\ILM-ORA\frontend
npm run dev
```

## Test in Browser

1. Open browser to frontend URL (usually http://localhost:5173 or http://localhost:3000)
2. Navigate to a university detail page
3. The review section should display with charts

## API Endpoints Available

- `POST http://localhost:3005/predict` - Predict single review rating
- `POST http://localhost:3005/predict/batch` - Predict multiple reviews
- `GET http://localhost:3005/health` - Check service status

## Sample API Call from Frontend

```javascript
const response = await fetch('http://localhost:3005/predict', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    review_text: "Great university!",
    factor: "Academics",
    university: "NUST",
    city: "Islamabad"
  })
});

const data = await response.json();
console.log('Predicted rating:', data.rating);
```

## What You'll See

- Review cards with AI-predicted ratings
- Bar chart showing rating breakdown by factor
- Pie chart showing review distribution
- Overall rating calculated from all reviews

Your trained DeBERTA model will analyze each review in real-time! 🚀
