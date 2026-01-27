import joblib
import numpy as np
import pandas as pd
from pathlib import Path
from pydantic import BaseModel
from typing import List, Optional

# --- PATHS ---
# Adjust relative path to find models_artifacts folder
# __file__ is src/controllers/rec_Controller.py
# We need to go: controllers -> src -> (stay in src) -> models_artifacts
BASE_DIR = Path(__file__).resolve().parent.parent  # This is 'src'
MODEL_PATH = BASE_DIR / "models_artifacts" / "degree_model.pkl"
ENCODER_PATH = BASE_DIR / "models_artifacts" / "bg_encoder.pkl"

# --- GLOBAL VARS ---
model = None
bg_encoder = None

def load_artifacts():
    global model, bg_encoder
    try:
        print(f"🔍 Looking for model at: {MODEL_PATH}")
        print(f"🔍 Looking for encoder at: {ENCODER_PATH}")
        print(f"🔍 Model path exists: {MODEL_PATH.exists()}")
        print(f"🔍 Encoder path exists: {ENCODER_PATH.exists()}")
        
        if MODEL_PATH.exists() and ENCODER_PATH.exists():
            model = joblib.load(MODEL_PATH)
            bg_encoder = joblib.load(ENCODER_PATH)
            print(f"✅ AI Model loaded from {MODEL_PATH}")
            print(f"✅ Background encoder loaded from {ENCODER_PATH}")
        else:
            print(f"❌ Model file not found at {MODEL_PATH}")
            print(f"❌ Encoder file not found at {ENCODER_PATH}")
            print(f"   Current working directory: {Path.cwd()}")
            print(f"   BASE_DIR resolved to: {BASE_DIR}")
    except Exception as e:
        print(f"❌ Error loading model: {e}")
        import traceback
        print(traceback.format_exc())

# --- SCHEMAS (Must match frontend payload) ---
class StudentBackground(BaseModel):
    level: str
    group: str

class RecommendationRequest(BaseModel):
    # The frontend sends these (likely average 1-5 or sum 0-30)
    # We will normalize inside the function
    R: float
    I: float
    A: float
    S: float
    E: float
    C: float
    background: StudentBackground

class DegreeMatch(BaseModel):
    id: int
    name: str
    match: int # Percentage
    field: str
    description: str
    avgSalary: str
    duration: str = "4 Years" # Default
    requirements: str

# --- HELPER: Static Metadata for Degrees ---
# The AI predicts the NAME, but we need extra info (Salary, Desc) for the UI card.
# In a real app, this would come from a database.
DEGREE_METADATA = {
    "Computer Science": {
        "field": "Technology",
        "desc": "Study algorithms, AI, and software development.",
        "salary": "PKR 100K-300K/mo",
        "req": "FSc Pre-Engineering / ICS"
    },
    "Software Engineering": {
        "field": "Technology",
        "desc": "Focus on building robust software systems and apps.",
        "salary": "PKR 90K-250K/mo",
        "req": "FSc Pre-Engineering / ICS"
    },
    "Data Science": {
        "field": "Technology",
        "desc": "Analyze data to find trends and build AI models.",
        "salary": "PKR 120K-350K/mo",
        "req": "Mathematics / Statistics background"
    },
    "BBA": {
        "field": "Business",
        "desc": "Learn management, finance, and marketing strategies.",
        "salary": "PKR 60K-150K/mo",
        "req": "Intermediate (Any group)"
    },
    "Mechanical Engineering": {
        "field": "Engineering",
        "desc": "Design and build machines, engines, and systems.",
        "salary": "PKR 70K-180K/mo",
        "req": "FSc Pre-Engineering"
    },
    # Add generic fallback
    "Generic": {
        "field": "General",
        "desc": "A recognized degree program in this field.",
        "salary": "PKR 50K-100K/mo",
        "req": "Intermediate/A-Level"
    }
}

# --- LOGIC ---
def get_recommendations(request: RecommendationRequest) -> List[DegreeMatch]:
    # 1. Load Model if needed
    if model is None or bg_encoder is None:
        print("⚠️ Model not loaded, attempting to load now...")
        load_artifacts()
        if model is None or bg_encoder is None:
            print("❌ Failed to load model. Cannot generate recommendations.")
            return [] # Fail gracefully if model is missing
    
    print(f"✅ Model ready. Processing recommendation request...")

    # 2. Prepare Input Vector
    # The model expects: [R, I, A, S, E, C, bg_encoded]
    
    # Scale scores: Frontend sends averages (1-5). Training used Sums (5-30).
    # Multiplier = 6 (since 5 * 6 = 30)
    r_val = request.R * 6
    i_val = request.I * 6
    a_val = request.A * 6
    s_val = request.S * 6
    e_val = request.E * 6
    c_val = request.C * 6

    # Encode Background
    # We must match the strings used during training in 'clean_alumni_data.csv'
    bg_string = request.background.group 
    
    # Simple mapping from Frontend Labels -> Training Labels
    # Adjust 'FSc Pre-Engineering' to match whatever is in your clean CSV
    bg_map = {
        "Pre-Engineering": "FSc Pre-Engineering",
        "Pre-Medical": "FSc Pre-Medical",
        "ICS": "ICS",
        "Commerce": "I.Com",
        "Arts": "FA"
    }
    mapped_bg = bg_map.get(bg_string, bg_string)
    
    try:
        # Use the saved encoder to turn string -> int
        bg_code = bg_encoder.transform([mapped_bg])[0]
    except Exception:
        # If unseen background, use a safe default (e.g. 0) or the most common one
        bg_code = 0 

    # Create the single row for prediction
    input_vector = pd.DataFrame(
        [[r_val, i_val, a_val, s_val, e_val, c_val, bg_code]], 
        columns=['R_Score', 'I_Score', 'A_Score', 'S_Score', 'E_Score', 'C_Score', 'bg_encoded']
    )

    # 3. Predict Probabilities
    # This gets probability for ALL degrees known to the model
    probs = model.predict_proba(input_vector)[0]
    classes = model.classes_

    # Zip them together: [("CS", 0.85), ("BBA", 0.10)...]
    predictions = list(zip(classes, probs))
    
    # Sort by highest probability first
    predictions.sort(key=lambda x: x[1], reverse=True)

    # 4. Filter & Format Output
    valid_recommendations = []
    id_counter = 1
    
    for degree_name, score in predictions:
        # Skip low confidence predictions (noise)
        if score < 0.05: continue
        
        # --- HARD CONSTRAINT CHECK ---
        # Don't recommend Engineering to Medical students even if AI thinks they fit personality-wise
        if not is_eligible(degree_name, request.background.group):
            continue
            
        # Get metadata
        meta = DEGREE_METADATA.get(degree_name, DEGREE_METADATA["Generic"])
        
        valid_recommendations.append(DegreeMatch(
            id=id_counter,
            name=degree_name,
            match=int(score * 100), # Convert 0.95 -> 95
            field=meta["field"],
            description=meta["desc"],
            avgSalary=meta["salary"],
            requirements=meta["req"]
        ))
        id_counter += 1
        
        # Stop after top 3-5 matches
        if len(valid_recommendations) >= 5:
            break
            
    return valid_recommendations

def is_eligible(degree: str, group: str) -> bool:
    """Hard constraints to prevent invalid academic paths."""
    deg = degree.lower()
    grp = group.lower()

    # Rule 1: Medical degrees require Pre-Medical
    if "mbbs" in deg or "medical" in deg or "pharmacy" in deg:
        if "pre-medical" not in grp: return False
        
    # Rule 2: Engineering requires Pre-Eng (usually)
    # Exception: Software Engineering often allows ICS
    if "engineering" in deg and "software" not in deg:
        if "pre-engineering" not in grp: return False
        
    return True