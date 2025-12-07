# Quiz Service Upgrade - Implementation Summary

## ✅ Backend Implementation Complete

### Changes Made:

1. **MongoDB Integration**
   - Added `pymongo` and `python-dotenv` to requirements.txt
   - Created `database/db.py` with MongoDB connection
   - Created `repositories/quiz_repository.py` for data persistence
   - Added `.env` file for configuration

2. **Persistent Session Storage**
   - Quiz sessions now saved to MongoDB (`quiz_sessions` collection)
   - Quiz results saved to MongoDB (`quiz_results` collection)
   - Automatic resume: If user leaves and comes back, session resumes from where they left off

3. **Back Navigation**
   - Added `answer_history` to track all previous questions and answers
   - Implemented `go_back_one_question()` in quiz_Logic.py
   - Created `/api/quiz/back` endpoint

4. **New Features**
   - User ID tracking: All sessions linked to user
   - Quiz history: Users can view all their past quiz attempts
   - Results persistence: Results stored permanently in database
   - Session resume: Automatically resumes incomplete sessions

5. **New API Endpoints**
   - `POST /api/quiz/back` - Go back to previous question
   - `GET /api/quiz/history/:userId` - Get user's quiz history
   - Updated `POST /api/quiz/start` - Now accepts `user_id` in payload
   - Updated all endpoints to use database instead of in-memory storage

6. **Gateway Updates**
   - Added back navigation route
   - Added history route
   - Updated finish endpoint to use POST method

---

## 🔄 Frontend Updates Required

### Files Already Updated:
1. ✅ `quizAPI.js` - Added goBack, getUserHistory methods, fixed finishQuizEarly
2. ✅ `quizService.js` - Added goBack and getUserHistory methods, updated startQuiz to accept userId

### Files That Need Updates:

#### 1. **QuizQuestions.jsx** - Add Back Button

Add this to the component (around line 100+):

```jsx
import { useAuth } from "@/app/providers/AuthProvider";

export function QuizQuestions() {
  const { user } = useAuth(); // Add this
  
  // ... existing code ...
  
  // Add handler for back button
  const handleGoBack = async () => {
    try {
      await quizService.goBack();
    } catch (error) {
      console.error("Failed to go back:", error);
    }
  };
  
  // Update handleStartQuiz to pass user_id
  const handleStartQuiz = async () => {
    if (!background.level || !background.group) {
      alert("Please select both Level and Group");
      return;
    }
    
    try {
      // Pass user ID from auth
      const userId = user?.id || user?.email || 'anonymous';
      await quizService.startQuiz(background, userId);
      setShowBackgroundForm(false);
    } catch (err) {
      console.error(err);
    }
  };
```

Then add a Back button in the question UI (find the button section):

```jsx
<div className="flex gap-3">
  {/* Back Button - Show if user has answered at least one question */}
  {questionsAnswered > 0 && (
    <Button
      variant="outline"
      onClick={handleGoBack}
      disabled={isLoading}
      className="flex-1"
    >
      <ArrowLeft className="w-4 h-4 mr-2" />
      Back
    </Button>
  )}
  
  {/* Next Button */}
  <Button
    onClick={handleAnswerSubmit}
    disabled={isLoading}
    className="flex-1 bg-gradient-to-r"
  >
    {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
    Next <ArrowRight className="w-4 h-4 ml-2" />
  </Button>
</div>
```

#### 2. **Dashboard.jsx** - Add Quiz History Link

Add a new card to view quiz history:

```jsx
{
  title: "Quiz History",
  description: "View all your past quiz attempts",
  icon: ClipboardList,
  link: "/quiz-history",
  color: "from-teal-500 to-teal-600",
  completed: false
}
```

#### 3. **Create QuizHistory.jsx** (New File)

Location: `frontend/src/microservices/quiz/presentation/pages/QuizHistory.jsx`

```jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/app/providers/AuthProvider";
import { quizService } from "../../application/quizService";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Loader2, Eye } from "lucide-react";

export function QuizHistory() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHistory() {
      if (!user) return;
      
      try {
        const userId = user.id || user.email;
        const data = await quizService.getUserHistory(userId);
        setHistory(data);
      } catch (error) {
        console.error("Failed to load quiz history:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchHistory();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Your Quiz History</h1>
      
      {history.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground">No quiz attempts yet. Take your first quiz!</p>
            <Button onClick={() => navigate("/quiz-intro")} className="mt-4">
              Start Quiz
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {history.map((item) => (
            <Card key={item.session_id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Holland Code: {item.holland_code}</CardTitle>
                  <Badge>{item.total_questions} questions</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Completed: {new Date(item.completed_at).toLocaleString()}
                </p>
              </CardHeader>
              <CardContent>
                <Button
                  variant="outline"
                  onClick={() => navigate(`/quiz-results?session=${item.session_id}`)}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View Results
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
```

---

## 🚀 Deployment Steps

### 1. Install Python Dependencies
```powershell
cd backend\services\quiz-service
pip install -r src\requirements.txt
```

### 2. Start MongoDB
Make sure MongoDB is running on `mongodb://localhost:27017/`

### 3. Start Quiz Service
```powershell
cd backend\services\quiz-service\src
uvicorn main:app --reload --port 3002
```

### 4. Test the New Features

#### Test Back Navigation:
```powershell
# Start quiz
curl -X POST http://localhost:3002/api/quiz/start -H "Content-Type: application/json" -d "{\"background\":{\"level\":\"Intermediate\",\"group\":\"Pre-Engineering\"},\"user_id\":\"test@example.com\"}"

# Answer a question (save session_id from above)
curl -X POST http://localhost:3002/api/quiz/answer -H "Content-Type: application/json" -d "{\"session_id\":\"SESSION_ID\",\"question_id\":\"Q1\",\"dimension\":\"R\",\"score\":4}"

# Go back
curl -X POST http://localhost:3002/api/quiz/back -H "Content-Type: application/json" -d "{\"session_id\":\"SESSION_ID\"}"
```

#### Test Quiz History:
```powershell
curl http://localhost:3002/api/quiz/history/test@example.com
```

---

## 📊 Database Collections

### quiz_sessions
```json
{
  "session_id": "uuid",
  "user_id": "user@email.com",
  "state": {
    "scores": {...},
    "counts": {...},
    "total_asked": 5,
    "is_complete": false,
    "answer_history": [...]
  },
  "created_at": "2025-12-06T...",
  "updated_at": "2025-12-06T..."
}
```

### quiz_results
```json
{
  "session_id": "uuid",
  "user_id": "user@email.com",
  "holland_code": "RIA",
  "dimension_averages": {...},
  "sorted_results": [...],
  "total_questions": 24,
  "background": {...},
  "completed_at": "2025-12-06T..."
}
```

---

## ✨ Key Features

1. **Persistent Progress**: Leave quiz anytime, come back later - it resumes automatically
2. **Back Navigation**: Made a mistake? Go back and change your answer
3. **Quiz History**: View all past attempts with dates and scores
4. **Results Storage**: Results stored permanently, view anytime
5. **User Tracking**: All data linked to user account

---

## 🐛 Known Issues to Fix

1. Frontend needs ArrowLeft icon import in QuizQuestions.jsx
2. Route for /quiz-history needs to be added to router
3. Question text not being saved properly in answer_history (using question_id as placeholder)

---

## 🎯 Next Steps

1. Update QuizQuestions.jsx with back button (code provided above)
2. Create QuizHistory.jsx page (code provided above)
3. Add route for quiz history in your routes file
4. Test the complete flow:
   - Start quiz
   - Answer some questions
   - Go back and change answers
   - Complete quiz
   - View results
   - View history
   - Resume incomplete quiz
