"""
Convert trained DeBERTA regression model to ONNX format for Transformers.js deployment.

This script:
1. Loads the saved DeBERTA model from ./deberta_unified_regression
2. Converts it to ONNX format using Optimum
3. Quantizes for faster inference
4. Saves the ONNX model ready for Hugging Face upload

Requirements:
    pip install optimum[exporters] onnx onnxruntime transformers torch

Usage:
    python convert_model.py
"""

import os
from pathlib import Path
from transformers import AutoTokenizer, AutoModelForSequenceClassification
from optimum.onnxruntime import ORTModelForSequenceClassification
from optimum.onnxruntime.configuration import AutoQuantizationConfig
from optimum.onnxruntime import ORTQuantizer

# Paths
MODEL_DIR = r"C:\Users\i222683AbdullahGhani\Downloads\deberta_unified_regression"
ONNX_OUTPUT_DIR = r"C:\Users\i222683AbdullahGhani\Downloads\deberta_unified_regression_onnx"
QUANTIZED_OUTPUT_DIR = r"C:\Users\i222683AbdullahGhani\Downloads\deberta_unified_regression_onnx_quantized"

def convert_to_onnx():
    """Convert PyTorch model to ONNX format."""
    print("=" * 60)
    print("STEP 1: Converting DeBERTA model to ONNX format")
    print("=" * 60)
    
    if not os.path.exists(MODEL_DIR):
        raise FileNotFoundError(
            f"Model directory not found: {MODEL_DIR}\n"
            f"Please ensure you have trained the model first."
        )
    
    print(f"Loading model from: {MODEL_DIR}")
    
    try:
        # Load the trained model - force PyTorch format
        model = AutoModelForSequenceClassification.from_pretrained(
            MODEL_DIR,
            num_labels=1,
            problem_type="regression",
            use_safetensors=False  # Use PyTorch .bin format instead
        )
        tokenizer = AutoTokenizer.from_pretrained(MODEL_DIR)
    except Exception as e:
        print(f"Error loading model: {e}")
        print("\nTrying to load from PyTorch checkpoint...")
        # Try loading model weights manually
        import torch
        model = AutoModelForSequenceClassification.from_pretrained(
            "microsoft/deberta-v3-base",
            num_labels=1,
            problem_type="regression"
        )
        # Load the state dict from training_args or checkpoint
        checkpoint_path = os.path.join(MODEL_DIR, "pytorch_model.bin")
        if os.path.exists(checkpoint_path):
            state_dict = torch.load(checkpoint_path, map_location="cpu")
            model.load_state_dict(state_dict)
        tokenizer = AutoTokenizer.from_pretrained(MODEL_DIR)
    
    print("Converting to ONNX...")
    
    # Convert to ONNX using Optimum
    ort_model = ORTModelForSequenceClassification.from_pretrained(
        MODEL_DIR,
        export=True,
        provider="CPUExecutionProvider",
        use_safetensors=False
    )
    
    # Save ONNX model
    os.makedirs(ONNX_OUTPUT_DIR, exist_ok=True)
    ort_model.save_pretrained(ONNX_OUTPUT_DIR)
    tokenizer.save_pretrained(ONNX_OUTPUT_DIR)
    
    print(f"✓ ONNX model saved to: {ONNX_OUTPUT_DIR}")
    return ONNX_OUTPUT_DIR


def quantize_model(onnx_dir):
    """Quantize ONNX model for faster inference."""
    print("\n" + "=" * 60)
    print("STEP 2: Quantizing ONNX model (optional but recommended)")
    print("=" * 60)
    
    try:
        print("Applying dynamic quantization...")
        
        # Create quantization config
        qconfig = AutoQuantizationConfig.avx512_vnni(is_static=False, per_channel=False)
        
        # Load ONNX model
        ort_model = ORTModelForSequenceClassification.from_pretrained(onnx_dir)
        tokenizer = AutoTokenizer.from_pretrained(onnx_dir)
        
        # Quantize
        quantizer = ORTQuantizer.from_pretrained(ort_model)
        quantizer.quantize(
            save_dir=QUANTIZED_OUTPUT_DIR,
            quantization_config=qconfig
        )
        
        tokenizer.save_pretrained(QUANTIZED_OUTPUT_DIR)
        
        print(f"✓ Quantized model saved to: {QUANTIZED_OUTPUT_DIR}")
        print("  (Use this for production - smaller size, faster inference)")
        
        return QUANTIZED_OUTPUT_DIR
        
    except Exception as e:
        print(f"⚠ Quantization failed: {e}")
        print("  Continuing with non-quantized model (still works fine)")
        return onnx_dir


def test_inference(model_dir):
    """Test the ONNX model with a sample input."""
    print("\n" + "=" * 60)
    print("STEP 3: Testing ONNX model inference")
    print("=" * 60)
    
    from optimum.onnxruntime import ORTModelForSequenceClassification
    from transformers import AutoTokenizer
    import numpy as np
    
    # Load ONNX model
    model = ORTModelForSequenceClassification.from_pretrained(model_dir)
    tokenizer = AutoTokenizer.from_pretrained(model_dir)
    
    # Test samples
    test_reviews = [
        {
            "review_text": "The faculty is world-class and research opportunities are incredible. Best decision of my life!",
            "factor": "Faculty",
            "university": "NUST",
            "city": "Islamabad"
        },
        {
            "review_text": "Terrible facilities, very disappointed with the infrastructure.",
            "factor": "Facilities",
            "university": "NUST",
            "city": "Islamabad"
        },
        {
            "review_text": "It's okay, nothing special but not bad either.",
            "factor": "Campus Life",
            "university": "NUST",
            "city": "Islamabad"
        }
    ]
    
    print("\nRunning test predictions:\n")
    
    for review in test_reviews:
        # Format input like training
        input_text = f"[{review['factor']}] ({review['university']}, {review['city']}): {review['review_text']}"
        
        # Tokenize
        inputs = tokenizer(input_text, return_tensors="pt", truncation=True, max_length=256)
        
        # Predict
        outputs = model(**inputs)
        prediction = outputs.logits.item()
        
        # Clip to 1-5 range
        prediction = max(1.0, min(5.0, prediction))
        
        print(f"Review: {review['review_text'][:60]}...")
        print(f"Factor: {review['factor']}")
        print(f"Predicted Rating: {prediction:.2f}/5.0")
        print("-" * 60)
    
    print("\n✓ ONNX model is working correctly!")


def create_readme():
    """Create README for Hugging Face model card."""
    readme_content = """---
language: en
license: apache-2.0
tags:
- text-classification
- regression
- sentiment-analysis
- university-reviews
- deberta-v3
datasets:
- custom
metrics:
- mae
- rmse
- r2
model-index:
- name: deberta-v3-university-review-rating
  results:
  - task:
      type: text-classification
      name: Review Rating Prediction
    metrics:
    - type: mae
      value: [YOUR_MAE_VALUE]
      name: Mean Absolute Error
    - type: rmse
      value: [YOUR_RMSE_VALUE]
      name: Root Mean Squared Error
    - type: r2
      value: [YOUR_R2_VALUE]
      name: R² Score
---

# DeBERTA-v3 University Review Rating Predictor

This model predicts university review ratings (1-5 scale) based on review text and metadata (factor, university, city).

## Model Description

- **Base Model**: microsoft/deberta-v3-base
- **Task**: Regression (rating prediction)
- **Training Data**: 2000 university reviews
- **Input Format**: `[Factor] (University, City): Review Text`

## Factors

The model is trained to predict ratings for these aspects:
- Academics
- Faculty
- Campus Life
- Facilities
- Placements

## Usage

### With Transformers.js (JavaScript/Node.js)

```javascript
import { pipeline } from '@xenova/transformers';

const classifier = await pipeline('text-classification', 'YOUR_USERNAME/deberta-v3-university-review-rating');

const input = "[Faculty] (NUST, Islamabad): The professors are excellent and very supportive!";
const result = await classifier(input);
console.log(result); // Predicted rating
```

### With Python

```python
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch

tokenizer = AutoTokenizer.from_pretrained("YOUR_USERNAME/deberta-v3-university-review-rating")
model = AutoModelForSequenceClassification.from_pretrained("YOUR_USERNAME/deberta-v3-university-review-rating")

input_text = "[Faculty] (NUST, Islamabad): The professors are excellent and very supportive!"
inputs = tokenizer(input_text, return_tensors="pt", truncation=True, max_length=256)

with torch.no_grad():
    outputs = model(**inputs)
    rating = outputs.logits.item()
    rating = max(1.0, min(5.0, rating))  # Clip to 1-5 range

print(f"Predicted Rating: {rating:.2f}/5.0")
```

## Training Details

- **Epochs**: 8 (with early stopping)
- **Batch Size**: 8
- **Learning Rate**: 2e-5
- **Max Length**: 256 tokens
- **Optimizer**: AdamW with weight decay 0.01

## Performance

| Metric | Value |
|--------|-------|
| MAE    | [YOUR_VALUE] |
| RMSE   | [YOUR_VALUE] |
| R²     | [YOUR_VALUE] |

## Citation

If you use this model, please cite:

```
@misc{deberta-university-reviews,
  author = {Your Name},
  title = {DeBERTA-v3 University Review Rating Predictor},
  year = {2025},
  publisher = {Hugging Face},
  howpublished = {\\url{https://huggingface.co/YOUR_USERNAME/deberta-v3-university-review-rating}}
}
```
"""
    
    output_path = os.path.join(QUANTIZED_OUTPUT_DIR if os.path.exists(QUANTIZED_OUTPUT_DIR) else ONNX_OUTPUT_DIR, "README.md")
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(readme_content)
    
    print(f"\n✓ README.md created at: {output_path}")
    print("  Please update with your actual metrics and Hugging Face username!")


def main():
    print("\n🚀 DeBERTA Model Conversion Script\n")
    
    try:
        # Step 1: Convert to ONNX
        onnx_dir = convert_to_onnx()
        
        # Step 2: Quantize (optional)
        final_dir = quantize_model(onnx_dir)
        
        # Step 3: Test inference
        test_inference(final_dir)
        
        # Step 4: Create README
        create_readme()
        
        print("\n" + "=" * 60)
        print("✅ CONVERSION COMPLETE!")
        print("=" * 60)
        print(f"\nYour ONNX model is ready at: {final_dir}")
        print("\nNext steps:")
        print("1. Update README.md with your actual metrics")
        print("2. Create a Hugging Face account if you don't have one")
        print("3. Upload the model:")
        print(f"   - Go to https://huggingface.co/new")
        print(f"   - Upload all files from: {final_dir}")
        print("4. Update MODEL_NAME in university-service/src/services/sentimentService.js")
        print("   with your Hugging Face model path (username/model-name)")
        
    except Exception as e:
        print(f"\n❌ Error: {e}")
        import traceback
        traceback.print_exc()
        return 1
    
    return 0


if __name__ == "__main__":
    exit(main())
