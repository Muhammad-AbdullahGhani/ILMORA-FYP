import pandas as pd
import joblib
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from pathlib import Path

# Input is now the CLEAN file from preprocess.py
CSV_PATH = "clean_alumni_data.csv" 
MODEL_DIR = Path("../models_artifacts")
MODEL_DIR.mkdir(exist_ok=True)

def train():
    print("⏳ Loading Clean Data...")
    
    if not Path(CSV_PATH).exists():
        print(f"❌ Error: '{CSV_PATH}' not found. Run preprocess.py first!")
        return

    # Load data
    df = pd.read_csv(CSV_PATH)
    
    # --- DATA CLEANING FOR TRAINING ---
    # 1. Drop rows where the Target (Major) is missing
    initial_count = len(df)
    df = df.dropna(subset=['Major'])
    
    if len(df) < initial_count:
        print(f"   ⚠️ Dropped {initial_count - len(df)} rows due to missing Major.")

    # 2. Fill missing numeric scores with 0 (Safety check)
    score_cols = ['R_Score', 'I_Score', 'A_Score', 'S_Score', 'E_Score', 'C_Score']
    df[score_cols] = df[score_cols].fillna(0)

    print(f"   Training on {len(df)} records.")

    # 1. Encode Background
    le_bg = LabelEncoder()
    df['Background'] = df['Background'].fillna("Unknown").astype(str)
    df['bg_encoded'] = le_bg.fit_transform(df['Background'])
    
    # 2. Features (X)
    X = df[['R_Score', 'I_Score', 'A_Score', 'S_Score', 'E_Score', 'C_Score', 'bg_encoded']]
    
    # 3. Target (y) - Enhanced with Specialization
    # We combine Major + Specialization to give more specific recommendations
    # e.g., "Computer Science" -> "Computer Science (Artificial Intelligence)"
    
    # Ensure Specialization column exists (it might be missing if preprocess.py didn't include it)
    # Check if 'Specialization' column is in the CSV, if not, try to find it or fallback
    target_col = 'Major'
    
    # Logic to include Specialization if available
    # NOTE: You must ensure preprocess.py actually saves this column to clean_alumni_data.csv
    # If it's not in clean_alumni_data.csv, we can't use it here.
    # Assuming preprocess.py passed it through or we re-read the raw file (which is messy).
    # Ideally, add 'Specialization' to the final_cols list in preprocess.py first.
    
    if 'Specialization' in df.columns:
        print("   ✅ Found Specialization column. Enhancing Target Labels...")
        df['Specialization'] = df['Specialization'].fillna('')
        
        def combine_major_spec(row):
            major = row['Major']
            spec = str(row['Specialization']).strip()
            # Only add specialization if it's meaningful (not 'nan', 'None', etc)
            if spec and spec.lower() not in ['nan', 'none', 'null', '']:
                return f"{major} ({spec})"
            return major

        y = df.apply(combine_major_spec, axis=1)
    else:
        print("   ⚠️ Specialization column not found in clean data. Predicting Major only.")
        y = df['Major']

    # 4. Train
    print("⏳ Training Random Forest...")
    clf = RandomForestClassifier(n_estimators=100, random_state=42)
    clf.fit(X, y)

    # 5. Save
    joblib.dump(clf, MODEL_DIR / "degree_model.pkl")
    joblib.dump(le_bg, MODEL_DIR / "bg_encoder.pkl")
    
    print("🚀 Model Trained & Saved!")
    print(f"   - Classes (Degrees): {clf.classes_[:10]} ...") # Print first 10 classes

if __name__ == "__main__":
    train()