# Quiz Service Installation & Testing Guide

## 📦 Install Dependencies

### Windows PowerShell:
```powershell
# Navigate to quiz service directory
cd backend\services\quiz-service

# Install Python dependencies
pip install -r src\requirements.txt

# Verify installation
pip list | Select-String "pymongo|python-dotenv"
```

### Alternative (if above fails):
```powershell
pip install pymongo>=4.6.0 python-dotenv>=1.0.0
```

## 🚀 Start Services

### 1. Start MongoDB
Make sure MongoDB is running on `mongodb://localhost:27017/`

Check if running:
```powershell
# Try connecting
mongosh
```

If not running, start MongoDB service:
```powershell
# Windows Service
net start MongoDB

# Or if installed manually
mongod --dbpath "C:\data\db"
```

### 2. Start Quiz Service
```powershell
cd backend\services\quiz-service\src
uvicorn main:app --reload --port 3002
```

### 3. Start Gateway (in another terminal)
```powershell
cd backend\services\gateway\src
node index.js
```

### 4. Start Frontend (in another terminal)
```powershell
cd frontend
npm run dev
```

## 🧪 Test New Features

### Test 1: Start Quiz with User ID
```powershell
# Using curl (Windows)
curl -X POST http://localhost:3002/api/quiz/start `
  -H "Content-Type: application/json" `
  -d '{\"background\":{\"level\":\"Intermediate\",\"group\":\"Pre-Engineering\"},\"user_id\":\"test@example.com\"}'
```

You should get back:
```json
{
  "session_id": "some-uuid",
  "is_complete": false,
  "total_asked": 0,
  "current_question_index": 0,
  "can_go_back": false,
  "next_question": {
    "id": "Q1",
    "text": "...",
    "dimension": "R",
    "options": [1,2,3,4,5]
  }
}
```

### Test 2: Answer Question
```powershell
# Save the session_id from above response
$sessionId = "YOUR_SESSION_ID"

curl -X POST http://localhost:3002/api/quiz/answer `
  -H "Content-Type: application/json" `
  -d "{\"session_id\":\"$sessionId\",\"question_id\":\"Q1\",\"dimension\":\"R\",\"score\":4}"
```

### Test 3: Go Back
```powershell
curl -X POST http://localhost:3002/api/quiz/back `
  -H "Content-Type: application/json" `
  -d "{\"session_id\":\"$sessionId\"}"
```

You should get the previous question back with `can_go_back: false` (since it's the first question again).

### Test 4: Complete Quiz and View History
```powershell
# Complete the quiz (answer all questions or force finish)
curl -X POST http://localhost:3002/api/quiz/finish/$sessionId

# Get user's quiz history
curl http://localhost:3002/api/quiz/history/test@example.com
```

## 🌐 Test in Browser

1. **Start a New Quiz:**
   - Go to http://localhost:3001/quiz-intro
   - Select your background
   - Start the quiz

2. **Test Back Button:**
   - Answer a few questions
   - Click the "Back" button (should appear after first question)
   - Change your answer
   - Continue

3. **Test Session Resume:**
   - Start a quiz
   - Answer 2-3 questions
   - Close the browser tab
   - Go back to http://localhost:3001/quiz-intro
   - Start quiz again - it should resume from where you left off!

4. **View Quiz History:**
   - Complete a quiz
   - Go to http://localhost:3001/quiz-history
   - You should see your completed quiz
   - Click "View Detailed Results" to see the results again

## 🗄️ Check Database

Connect to MongoDB and verify data:
```powershell
mongosh

# Switch to quiz database
use quiz_db

# Check sessions
db.quiz_sessions.find().pretty()

# Check results
db.quiz_results.find().pretty()

# Count user's attempts
db.quiz_results.countDocuments({"user_id": "test@example.com"})
```

## ✅ Expected Behavior

### Back Navigation:
- ✅ Back button appears after answering first question
- ✅ Clicking back shows previous question
- ✅ Can change answer and continue
- ✅ Back button disabled on first question

### Session Persistence:
- ✅ Quiz progress saved to MongoDB
- ✅ Leaving mid-quiz and returning resumes automatically
- ✅ Results saved permanently
- ✅ Can view old results anytime

### Quiz History:
- ✅ Shows all past quiz attempts
- ✅ Displays Holland Code, date, and question count
- ✅ Can view detailed results of any past quiz
- ✅ Shows statistics (total attempts, latest code, avg questions)

## 🐛 Troubleshooting

### Issue: "Import pymongo could not be resolved"
**Solution:** This is just a linting error. The code will work. Install the packages:
```powershell
pip install pymongo python-dotenv
```

### Issue: "Connection refused" when starting quiz
**Solution:** Make sure MongoDB is running:
```powershell
mongosh
# If it connects, MongoDB is running
# If not, start it with: net start MongoDB
```

### Issue: "Session not found" error
**Solution:** The session expired or was deleted. Start a new quiz.

### Issue: Back button not showing
**Solution:** 
1. Make sure you answered at least one question
2. Check browser console for errors
3. Verify `questionsAnswered > 0` in component state

### Issue: Quiz doesn't resume
**Solution:**
1. Make sure you're logged in with the same user
2. Check MongoDB for active sessions:
   ```
   db.quiz_sessions.find({"user_id": "YOUR_EMAIL", "state.is_complete": false})
   ```

## 📝 Notes

- Quiz sessions are user-specific (linked to email/user ID)
- Results are stored permanently in MongoDB
- Session resume only works for incomplete quizzes
- Multiple users can take quizzes simultaneously
- All data persists across server restarts

## 🎉 Success Checklist

- [ ] MongoDB running and accessible
- [ ] Quiz service starts without errors
- [ ] Can start a new quiz
- [ ] Back button appears and works
- [ ] Session resumes after leaving
- [ ] Can complete quiz and see results
- [ ] Quiz history shows completed quizzes
- [ ] Can view old quiz results
- [ ] Database contains session and result documents
