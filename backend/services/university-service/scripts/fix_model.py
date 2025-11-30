"""
Fix corrupted safetensors file by re-saving the model in PyTorch format.
This script loads the model and saves it as pytorch_model.bin
"""

from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch
import os

MODEL_DIR = r"C:\Users\i222683AbdullahGhani\Downloads\deberta_unified_regression"

print("Attempting to load model with safetensors...")

try:
    # Try loading with safetensors
    model = AutoModelForSequenceClassification.from_pretrained(
        MODEL_DIR,
        num_labels=1,
        problem_type="regression",
        ignore_mismatched_sizes=True
    )
    tokenizer = AutoTokenizer.from_pretrained(MODEL_DIR)
    
    print("✓ Model loaded successfully!")
    
    # Save in PyTorch format
    print("\nSaving model in PyTorch format...")
    model.save_pretrained(MODEL_DIR, safe_serialization=False)
    
    print(f"✓ Model re-saved to: {MODEL_DIR}")
    print("✓ You can now run convert_model.py")
    
except Exception as e:
    print(f"❌ Error: {e}")
    print("\nTrying alternative: Loading from checkpoint...")
    
    # Check checkpoints
    checkpoints = [d for d in os.listdir(MODEL_DIR) if d.startswith('checkpoint-')]
    if checkpoints:
        # Use the latest checkpoint
        latest_checkpoint = sorted(checkpoints, key=lambda x: int(x.split('-')[1]))[-1]
        checkpoint_path = os.path.join(MODEL_DIR, latest_checkpoint)
        
        print(f"Loading from: {checkpoint_path}")
        
        model = AutoModelForSequenceClassification.from_pretrained(
            checkpoint_path,
            num_labels=1,
            problem_type="regression"
        )
        tokenizer = AutoTokenizer.from_pretrained(checkpoint_path)
        
        # Save to main directory
        print(f"\nSaving model to: {MODEL_DIR}")
        model.save_pretrained(MODEL_DIR, safe_serialization=False)
        tokenizer.save_pretrained(MODEL_DIR)
        
        print("✓ Model successfully saved!")
        print("✓ You can now run convert_model.py")
    else:
        print("❌ No checkpoints found. Please check your model directory.")
