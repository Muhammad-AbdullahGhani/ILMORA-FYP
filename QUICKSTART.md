# Quick Start Guide - Review System

## Your Model is Ready! 🎉
**Hugging Face**: https://huggingface.co/AbdullahGhani/Unidatamodel

## Setup Steps (5 minutes)

### 1. Install MongoDB (if not installed)
Download and install MongoDB Community Edition:
https://www.mongodb.com/try/download/community

Or use MongoDB Atlas (cloud - free tier):
https://www.mongodb.com/cloud/atlas/register

### 2. Start MongoDB
```bash
# If installed locally, MongoDB should auto-start
# Or start manually:
mongod
```

### 3. Install Backend Dependencies
```bash
cd C:\Users\i222683AbdullahGhani\Desktop\ILM-ORA\backend\services\university-service
npm install
```

### 4. Start University Service
```bash
# In the same directory
npm start
```

**Expected output:**
```
✓ Connected to MongoDB
Loading sentiment model...
✓ Sentiment model loaded and ready!
🚀 University Service running on http://localhost:3005
```

### 5. Test the API
Open a new terminal:
```bash
# Health check
curl http://localhost:3005/health

# Create a test review
curl -X POST http://localhost:3005/api/reviews -H "Content-Type: application/json" -d "{\"review_text\":\"Amazing faculty and great research opportunities!\",\"factor\":\"Faculty\",\"university\":\"NUST\",\"city\":\"Islamabad\"}"

# Get statistics
curl http://localhost:3005/api/reviews/NUST/stats
```

### 6. Start Frontend
```bash
cd C:\Users\i222683AbdullahGhani\Desktop\ILM-ORA\frontend
npm run dev
```

---

## Troubleshooting

### "Cannot find package"
Run: `npm install` in the university-service directory

### "MongoDB connection failed"
- Install MongoDB or use MongoDB Atlas
- Update MONGO_URI in `src/index.js` if needed

### "Model loading failed"
- Check internet connection (model downloads from Hugging Face)
- Wait 10-30 seconds for first load

---

## What You'll See

Once running, your review system will:
- ✅ Accept review submissions
- ✅ Predict ratings using your DeBERTA model (1-5 scale)
- ✅ Calculate statistics (overall rating, breakdown by factor)
- ✅ Generate review distributions for pie charts
- ✅ Display everything in the frontend with beautiful charts

Your model at `AbdullahGhani/Unidatamodel` will automatically analyze each review and assign a rating!
