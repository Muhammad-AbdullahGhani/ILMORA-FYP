from fastapi import APIRouter
from ..controllers import quiz_Controller
from ..models.quiz_schemas import (
    QuizStatus, AnswerSubmission, FinalResults, 
    StartQuizRequest, BackRequest, QuizHistoryItem
)

router = APIRouter(prefix="/api/quiz", tags=["Quiz"])

@router.post("/start", response_model=QuizStatus)
def start_quiz(request: StartQuizRequest):
    """Start or resume adaptive quiz session"""
    return quiz_Controller.create_session(request)

@router.post("/answer", response_model=QuizStatus)
def answer_question(submission: AnswerSubmission):
    """Submit answer and get next question"""
    return quiz_Controller.submit_user_answer(submission)

@router.post("/back", response_model=QuizStatus)
def go_back_question(request: BackRequest):
    """Go back to previous question"""
    return quiz_Controller.go_back(request)

@router.post("/finish/{session_id}", response_model=FinalResults)
def finish_quiz_early(session_id: str):
    """Force finish quiz early and get results"""
    return quiz_Controller.force_finish_session(session_id)

@router.get("/results/{session_id}", response_model=FinalResults)
def get_quiz_results(session_id: str):
    """Get final results for completed quiz"""
    return quiz_Controller.get_results(session_id)

@router.get("/history/{user_id}", response_model=list[QuizHistoryItem])
def get_user_history(user_id: str):
    """Get user's quiz completion history"""
    return quiz_Controller.get_user_quiz_history(user_id)