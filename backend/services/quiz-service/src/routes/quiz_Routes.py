from fastapi import APIRouter
from ..controllers import quiz_Controller
# Updated imports to include StartQuizRequest
from ..models.quiz_schemas import QuizStatus, AnswerSubmission, FinalResults, StartQuizRequest

router = APIRouter(prefix="/api/quiz", tags=["Quiz"])

# Updated to accept the JSON body
@router.post("/start", response_model=QuizStatus)
def start_quiz(request: StartQuizRequest):
    """Starts an adaptive quiz session with student background info."""
    return quiz_Controller.create_session(request)

@router.post("/answer", response_model=QuizStatus)
def answer_question(submission: AnswerSubmission):
    """Submits one answer and returns the NEXT adaptive question."""
    return quiz_Controller.submit_user_answer(submission)

# Added early finish route
@router.post("/finish/{session_id}", response_model=FinalResults)
def finish_quiz_early(session_id: str):
    return quiz_Controller.force_finish_session(session_id)

@router.get("/results/{session_id}", response_model=FinalResults)
def get_quiz_results(session_id: str):
    """Gets final RIASEC score after completion."""
    return quiz_Controller.get_results(session_id)