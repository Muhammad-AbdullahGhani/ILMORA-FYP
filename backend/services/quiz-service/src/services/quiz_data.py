import json
import random
from pathlib import Path
from typing import Dict, List, Any

# Locate the JSON file relative to this script
# Structure: quiz-service/src/services/quiz_data.py -> ../../../Gamified_quiz_questions.json
BASE_DIR = Path(__file__).resolve().parent.parent.parent
QUESTIONS_FILE = BASE_DIR / 'Gamified_quiz_questions.json'

RIASEC_DIMENSIONS = ['R', 'I', 'A', 'S', 'E', 'C']

def load_questions() -> Dict[str, List[Dict[str, Any]]]:
    """Loads questions from JSON and groups them by Dimension."""
    processed_questions = {dim: [] for dim in RIASEC_DIMENSIONS}
    
    try:
        if not QUESTIONS_FILE.exists():
            print(f"CRITICAL ERROR: Questions file not found at {QUESTIONS_FILE}")
            return processed_questions

        # FIX: Added encoding='utf-8' to prevent 'charmap' errors on Windows
        with open(QUESTIONS_FILE, 'r', encoding='utf-8') as f:
            data = json.load(f)
            
        # Handle both {"questions": [...]} and raw list format
        questions_list = data.get('questions', data)

        # Safety check: Ensure questions_list is actually a list
        if not isinstance(questions_list, list):
            print("ERROR: JSON data format incorrect. Expected a list of questions.")
            return processed_questions

        for q in questions_list:
            dim = q.get('dimension')
            if dim in RIASEC_DIMENSIONS:
                processed_questions[dim].append({
                    'id': q.get('id'),
                    # Uses 'gamified_text' if available, otherwise falls back to 'text'
                    'text': q.get('gamified_text', q.get('text')), 
                    'dimension': dim
                })
        
        # Log success
        count = sum(len(v) for v in processed_questions.values())
        print(f"SUCCESS: Loaded {count} questions.")

    except Exception as e:
        print(f"Error loading questions: {e}")
        
    return processed_questions

# Global pool loaded at startup
QUESTION_POOLS = load_questions()

def get_initial_state() -> Dict[str, Any]:
    """Creates a fresh state object for a new user."""
    # Create independent copies of question pools
    user_pools = {dim: QUESTION_POOLS[dim].copy() for dim in RIASEC_DIMENSIONS}
    for pool in user_pools.values():
        random.shuffle(pool)

    # Generate Baseline Sequence (Phase 1)
    baseline_seq = RIASEC_DIMENSIONS * 2
    random.shuffle(baseline_seq)
    
    return {
        'scores': {dim: 0 for dim in RIASEC_DIMENSIONS},
        'counts': {dim: 0 for dim in RIASEC_DIMENSIONS},
        'total_asked': 0,
        'is_complete': False,
        'baseline_sequence': baseline_seq,
        'pools': user_pools,
        'exploit_index': 0,
    }