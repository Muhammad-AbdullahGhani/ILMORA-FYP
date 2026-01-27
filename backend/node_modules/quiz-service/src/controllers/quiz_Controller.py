from fastapi import HTTPException
from datetime import datetime
from ..services import quiz_Logic
from ..models.quiz_schemas import (
    AnswerSubmission, QuizStatus, FinalResults, 
    StartQuizRequest, BackRequest, QuizHistoryItem
)
from ..repositories.quiz_repository import quiz_repo
import uuid

def create_session(request: StartQuizRequest) -> QuizStatus:
    """Create new quiz session (or resume if user has active session)"""
    user_id = request.user_id
    
    # Check if user has an active (incomplete) session
    existing_session = quiz_repo.get_user_active_session(user_id)
    
    if existing_session:
        # Resume existing session
        session_id = existing_session['session_id']
        state = existing_session['state']
        
        # Get next question from current state
        if not state['is_complete']:
            updated_state, next_q = quiz_Logic.calculate_next_step(state)
            quiz_repo.save_session(session_id, user_id, updated_state)
            
            return QuizStatus(
                session_id=session_id,
                is_complete=False,
                total_asked=updated_state['total_asked'],
                current_question_index=updated_state['total_asked'],
                can_go_back=len(updated_state.get('answer_history', [])) > 0,
                next_question=next_q
            )
    
    # Create new session
    session_id = str(uuid.uuid4())
    
    # Initialize state
    state = quiz_Logic.start_new_session()
    state['background'] = request.background.dict()
    
    # Get first question
    updated_state, next_q = quiz_Logic.calculate_next_step(state)
    
    if next_q is None:
        print(f"ERROR: No question returned for new session {session_id}")
        raise HTTPException(500, "Failed to generate quiz questions")
    
    # Save to database
    quiz_repo.save_session(session_id, user_id, updated_state)
    
    return QuizStatus(
        session_id=session_id,
        is_complete=False,
        total_asked=updated_state['total_asked'],
        current_question_index=0,
        can_go_back=False,
        next_question=next_q
    )

def submit_user_answer(submission: AnswerSubmission) -> QuizStatus:
    """Submit answer and get next question"""
    sid = submission.session_id
    
    # Get session from database
    session_doc = quiz_repo.get_session(sid)
    if not session_doc:
        raise HTTPException(404, "Session not found")
    
    state = session_doc['state']
    user_id = session_doc['user_id']
    
    # Get the current question text from submission or fallback to question_id
    current_question_text = getattr(submission, 'question_text', submission.question_id)
    
    # 1. Update Score with history tracking
    state = quiz_Logic.process_answer(
        state, 
        submission.dimension, 
        submission.score,
        submission.question_id,
        current_question_text
    )
    
    # 2. Check Completion Logic
    if state['is_complete']:
        res = quiz_Logic.compute_results(state)
        
        # Save final state to database
        quiz_repo.save_session(sid, user_id, state)
        
        # Save results
        quiz_repo.save_result(
            sid, 
            user_id, 
            res, 
            state.get('background', {})
        )
        
        return QuizStatus(
            session_id=sid,
            is_complete=True,
            total_asked=state['total_asked'],
            current_question_index=state['total_asked'],
            can_go_back=False,
            holland_code=res['holland_code'],
            next_question=None
        )
        
    # 3. Get Next Question
    state, next_q = quiz_Logic.calculate_next_step(state)
    
    # Save updated state
    quiz_repo.save_session(sid, user_id, state)
    
    return QuizStatus(
        session_id=sid,
        is_complete=state['is_complete'],
        total_asked=state['total_asked'],
        current_question_index=state['total_asked'],
        can_go_back=len(state.get('answer_history', [])) > 0,
        next_question=next_q
    )

def go_back(request: BackRequest) -> QuizStatus:
    """Go back to previous question"""
    sid = request.session_id
    
    # Get session from database
    session_doc = quiz_repo.get_session(sid)
    if not session_doc:
        raise HTTPException(404, "Session not found")
    
    state = session_doc['state']
    user_id = session_doc['user_id']
    
    # Check if can go back
    if not state.get('answer_history'):
        raise HTTPException(400, "No previous question to go back to")
    
    # Go back one question
    updated_state, prev_question = quiz_Logic.go_back_one_question(state)
    
    if prev_question is None:
        raise HTTPException(400, "Cannot go back")
    
    # Save updated state
    quiz_repo.save_session(sid, user_id, updated_state)
    
    return QuizStatus(
        session_id=sid,
        is_complete=False,
        total_asked=updated_state['total_asked'],
        current_question_index=updated_state['total_asked'],
        can_go_back=len(updated_state.get('answer_history', [])) > 0,
        next_question=prev_question
    )

def force_finish_session(session_id: str) -> FinalResults:
    """Force finish quiz early and get results"""
    session_doc = quiz_repo.get_session(session_id)
    if not session_doc:
        raise HTTPException(404, "Session not found")
    
    state = session_doc['state']
    user_id = session_doc['user_id']
    
    # Force complete
    state['is_complete'] = True
    
    # Compute results
    data = quiz_Logic.compute_results(state)
    
    # Save to database
    quiz_repo.save_session(session_id, user_id, state)
    quiz_repo.save_result(
        session_id, 
        user_id, 
        data, 
        state.get('background', {})
    )
    
    return FinalResults(
        session_id=session_id,
        background=state.get('background'),
        completed_at=datetime.utcnow().isoformat(),
        **data
    )

def get_results(session_id: str) -> FinalResults:
    """Get results for a completed quiz"""
    # Try to get from results collection first
    result_doc = quiz_repo.get_result(session_id)
    
    if result_doc:
        return FinalResults(
            session_id=result_doc['session_id'],
            total_questions=result_doc['total_questions'],
            dimension_averages=result_doc['dimension_averages'],
            holland_code=result_doc['holland_code'],
            sorted_results=result_doc['sorted_results'],
            background=result_doc.get('background'),
            completed_at=result_doc['completed_at'].isoformat() if result_doc.get('completed_at') else None
        )
    
    # Fallback to session if not in results yet
    session_doc = quiz_repo.get_session(session_id)
    if not session_doc:
        raise HTTPException(404, "Session not found")
    
    state = session_doc['state']
    if not state['is_complete']:
        raise HTTPException(400, "Quiz not complete")
    
    data = quiz_Logic.compute_results(state)
    return FinalResults(
        session_id=session_id,
        background=state.get('background'),
        **data
    )

def get_user_quiz_history(user_id: str) -> list[QuizHistoryItem]:
    """Get user's quiz completion history"""
    results = quiz_repo.get_user_results(user_id, limit=10)
    
    history = []
    for result in results:
        history.append(QuizHistoryItem(
            session_id=result['session_id'],
            holland_code=result['holland_code'],
            completed_at=result['completed_at'].isoformat(),
            total_questions=result['total_questions']
        ))
    
    return history