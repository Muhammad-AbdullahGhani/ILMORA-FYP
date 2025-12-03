# 📥 Import Your Training Data to MongoDB

## Step 1: Prepare Your CSV File

1. Copy your CSV file `university_reviews_2000_researched.csv` to:
   ```
   C:\Users\i222683AbdullahGhani\Desktop\ILM-ORA\backend\services\university-service\scripts\
   ```

2. Or update line 16 in `import_csv_to_mongodb.py` with your CSV path

## Step 2: Install Required Packages

```bash
cd backend/services/university-service/scripts
pip install pymongo pandas python-dotenv
```

## Step 3: Run the Import Script

```bash
python import_csv_to_mongodb.py
```

## What This Does:

✅ Connects to your MongoDB Atlas database  
✅ Clears any existing reviews  
✅ Imports all 2000 reviews from your CSV  
✅ Shows statistics by university and factor  

## After Import:

Your MongoDB will have 2000 reviews ready for:
- Frontend to display
- AI model to analyze
- Charts to visualize

## Test It:

1. Make sure Python AI service is running (port 3005)
2. Make sure frontend is running (port 3000)
3. Navigate to: `http://localhost:3000/universities/NUST`
4. You'll see real reviews with AI-predicted ratings! 🎉
