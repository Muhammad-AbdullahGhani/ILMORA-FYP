from fastapi import HTTPException
from ..services import quiz_Logic
# Updated imports to include StartQuizRequest
from ..models.quiz_schemas import AnswerSubmission, QuizStatus, FinalResults, StartQuizRequest

# In-Memory Session Store (Use Redis in production)
sessions = {}

# Updated to accept request body
def create_session(request: StartQuizRequest) -> QuizStatus:
    # 1. Create ID
    session_id = str(len(sessions) + 1)
    
    # 2. Initialize Logic
    state = quiz_Logic.start_new_session()
    
    # 3. NEW: Save background info into the session state
    # We convert the Pydantic model to a dict for storage
    state['background'] = request.background.dict()
    
    # 4. Get First Question
    updated_state, next_q = quiz_Logic.calculate_next_step(state)
    
    # 5. Save
    sessions[session_id] = updated_state
    
    return QuizStatus(
        session_id=session_id,
        is_complete=False, 
        total_asked=updated_state['total_asked'], 
        next_question=next_q
    )

def submit_user_answer(submission: AnswerSubmission) -> QuizStatus:
    sid = submission.session_id
    if sid not in sessions:
        raise HTTPException(404, "Session not found")
    
    state = sessions[sid]
    
    # 1. Update Score
    state = quiz_Logic.process_answer(state, submission.dimension, submission.score)
    
    # 2. Check Completion Logic
    if state['is_complete']:
        res = quiz_Logic.compute_results(state)
        sessions[sid] = state
        return QuizStatus(
            session_id=sid,
            is_complete=True,
            total_asked=state['total_asked'],
            holland_code=res['holland_code'],
            next_question=None
        )
        
    # 3. Get Next Question
    state, next_q = quiz_Logic.calculate_next_step(state)
    sessions[sid] = state
    
    return QuizStatus(
        session_id=sid,
        is_complete=state['is_complete'],
        total_asked=state['total_asked'],
        next_question=next_q
    )

# New function for early finish (if you haven't added it yet)
def force_finish_session(session_id: str) -> FinalResults:
    if session_id not in sessions:
        raise HTTPException(404, "Session not found")
    
    state = sessions[session_id]
    
    # Force the complete flag
    state['is_complete'] = True
    sessions[session_id] = state 
    
    data = quiz_Logic.compute_results(state)
    return FinalResults(**data)

def get_results(session_id: str) -> FinalResults:
    if session_id not in sessions:
        raise HTTPException(404, "Session not found")
        
    state = sessions[session_id]
    if not state['is_complete']:
        raise HTTPException(400, "Quiz not complete")
        
    data = quiz_Logic.compute_results(state)
    return FinalResults(**data)