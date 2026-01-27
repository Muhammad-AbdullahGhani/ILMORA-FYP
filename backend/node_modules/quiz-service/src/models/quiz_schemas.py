from pydantic import BaseModel
from typing import Dict, Any, Optional, List, Tuple

# NEW: Schema for background info
class StudentBackground(BaseModel):
    level: str
    group: str

# NEW: Request body for /start
class StartQuizRequest(BaseModel):
    background: StudentBackground
    user_id: str  # User ID from auth service

# Schema for a single Question sent to Frontend
class Question(BaseModel):
    id: str
    text: str
    dimension: str
    options: List[int] = [1, 2, 3, 4, 5]

# Schema for submitting an answer
class AnswerSubmission(BaseModel):
    session_id: str
    question_id: str
    question_text: Optional[str] = None  # Add question text for back navigation history
    dimension: str
    score: int

# NEW: Schema for going back to previous question
class BackRequest(BaseModel):
    session_id: str

# Schema for the response after every action
class QuizStatus(BaseModel):
    session_id: Optional[str] = None
    is_complete: bool
    total_asked: int
    current_question_index: int = 0  # NEW: Track position
    can_go_back: bool = False  # NEW: Can user go back?
    holland_code: Optional[str] = None
    next_question: Optional[Dict[str, Any]] = None
    previous_question: Optional[Dict[str, Any]] = None  # NEW: For back navigation

# Schema for Final Results
class FinalResults(BaseModel):
    session_id: str
    total_questions: int
    dimension_averages: Dict[str, float]
    holland_code: str
    sorted_results: List[Tuple[str, float]]
    background: Optional[Dict[str, str]] = None
    completed_at: Optional[str] = None

# NEW: Schema for user's quiz history
class QuizHistoryItem(BaseModel):
    session_id: str
    holland_code: str
    completed_at: str
    total_questions: int