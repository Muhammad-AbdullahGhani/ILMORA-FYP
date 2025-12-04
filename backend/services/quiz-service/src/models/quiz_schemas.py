from pydantic import BaseModel
from typing import Dict, Any, Optional, List, Tuple

# NEW: Schema for background info
class StudentBackground(BaseModel):
    level: str
    group: str

# NEW: Request body for /start
class StartQuizRequest(BaseModel):
    background: StudentBackground

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
    dimension: str
    score: int

# Schema for the response after every action
class QuizStatus(BaseModel):
    session_id: Optional[str] = None
    is_complete: bool
    total_asked: int
    holland_code: Optional[str] = None
    next_question: Optional[Dict[str, Any]] = None

# Schema for Final Results
class FinalResults(BaseModel):
    total_questions: int
    dimension_averages: Dict[str, float]
    holland_code: str
    sorted_results: List[Tuple[str, float]]