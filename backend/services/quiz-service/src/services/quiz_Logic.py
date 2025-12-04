import random
from typing import Dict, Any, Tuple, Optional, List
from ..services.quiz_data import (
    get_initial_state, 
    RIASEC_DIMENSIONS
)

# Constants
MAX_QUESTIONS = 36
MIN_QUESTIONS_BEFORE_STOP = 12
CONFIDENCE_THRESHOLD = 1.0
EXPLORE_CHANCE = 0.25

def _calculate_averages(state: Dict[str, Any]) -> Dict[str, float]:
    averages = {}
    for dim in RIASEC_DIMENSIONS:
        count = state['counts'][dim]
        averages[dim] = state['scores'][dim] / count if count > 0 else 0.0
    return averages

def _get_sorted_dimensions(averages: Dict[str, float]) -> List[Tuple[str, float]]:
    return sorted(averages.items(), key=lambda x: x[1], reverse=True)

def _check_stopping_condition(sorted_scores: List[Tuple[str, float]], total_asked: int) -> bool:
    if total_asked >= MAX_QUESTIONS: return True
    if total_asked < MIN_QUESTIONS_BEFORE_STOP: return False
    
    # Phase 3: Check Confidence Gap
    if len(sorted_scores) >= 4:
        gap = sorted_scores[2][1] - sorted_scores[3][1]
        if gap >= CONFIDENCE_THRESHOLD: return True
    return False

# --- Public Interface ---

def start_new_session() -> Dict[str, Any]:
    return get_initial_state()

def calculate_next_step(state: Dict[str, Any]) -> Tuple[Dict[str, Any], Optional[Dict[str, Any]]]:
    if state['is_complete']: return state, None

    total = state['total_asked']
    averages = _calculate_averages(state)
    sorted_scores = _get_sorted_dimensions(averages)

    if _check_stopping_condition(sorted_scores, total):
        state['is_complete'] = True
        return state, None

    dim_to_ask = None
    
    # Phase 1: Baseline
    if total < MIN_QUESTIONS_BEFORE_STOP:
        dim_to_ask = state['baseline_sequence'][total]
    # Phase 2: Adaptive
    else:
        exploit_pool = [d for d, s in sorted_scores[:3]]
        explore_pool = [d for d, s in sorted_scores[3:]]
        
        if random.random() < EXPLORE_CHANCE and explore_pool:
            dim_to_ask = random.choice(explore_pool)
        else:
            idx = state['exploit_index'] % len(exploit_pool)
            dim_to_ask = exploit_pool[idx]
            state['exploit_index'] += 1

    # Fetch Question
    pool = state['pools'].get(dim_to_ask, [])
    if pool:
        q = pool.pop(0)
        # Ensure dimension is set (it should already be set, but ensure it)
        q['dimension'] = dim_to_ask
        # Ensure question has all required fields
        if 'id' not in q or 'text' not in q:
            print(f"ERROR: Question missing required fields: {q}")
            state['is_complete'] = True
            return state, None
        return state, q
    else:
        # Fallback if pool is empty
        print(f"WARNING: Pool for dimension {dim_to_ask} is empty!")
        state['is_complete'] = True
        return state, None

def process_answer(state: Dict[str, Any], dim: str, score: int) -> Dict[str, Any]:
    if state['is_complete']: return state
    
    state['scores'][dim] += score
    state['counts'][dim] += 1
    state['total_asked'] += 1
    
    # Check stop immediately after update
    avgs = _calculate_averages(state)
    sorted_s = _get_sorted_dimensions(avgs)
    if _check_stopping_condition(sorted_s, state['total_asked']):
        state['is_complete'] = True
        
    return state

def compute_results(state: Dict[str, Any]) -> Dict[str, Any]:
    avgs = _calculate_averages(state)
    sorted_s = _get_sorted_dimensions(avgs)
    return {
        'total_questions': state['total_asked'],
        'is_complete': state['is_complete'],
        'dimension_averages': avgs,
        'sorted_results': sorted_s,
        'holland_code': "".join([d for d, s in sorted_s[:3]])
    }