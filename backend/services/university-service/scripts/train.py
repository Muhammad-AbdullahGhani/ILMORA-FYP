import os
import random
import numpy as np
import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from datasets import Value
import torch
from datasets import Dataset
from transformers import (
    AutoTokenizer,
    AutoModelForSequenceClassification,
    DataCollatorWithPadding,
    TrainingArguments,
    Trainer,
    EarlyStoppingCallback,
    set_seed,
)

# -------------------------
# CONFIG (Improved)
# -------------------------
MODEL_NAME = "microsoft/deberta-v3-base"   # MUCH better than roberta-base
MAX_LEN = 256
BATCH_SIZE = 8
EPOCHS = 8                     # allow early stopping to decide best point
LEARNING_RATE = 2e-5
OUTPUT_DIR = "./deberta_unified_regression"
SEED = 42
CSV_PATH = "/kaggle/input/datasets/mabdullahghani206/updateddataset/training_data_with_job_support.csv"

set_seed(SEED)

# -------------------------
# Metrics
# -------------------------
def compute_metrics(eval_pred):
    logits, labels = eval_pred
    preds = logits.squeeze().astype(float)
    labels = labels.astype(float)

    # clip predictions
    preds = np.clip(preds, 1.0, 5.0)

    mae = mean_absolute_error(labels, preds)
    mse = mean_squared_error(labels, preds)
    rmse = np.sqrt(mse)
    r2 = r2_score(labels, preds)

    return {"mae": mae, "rmse": rmse, "r2": r2}

# -------------------------
# LOAD DATA
# -------------------------
df = pd.read_csv(CSV_PATH)

# keep required columns
df = df[["review_text", "rating", "factor", "university", "city"]]

# shuffle
df = df.sample(frac=1, random_state=SEED).reset_index(drop=True)

# -------------------------
# Create combined text input
# -------------------------
def build_input(row):
    return (
        f"[{row['factor']}] ({row['university']}, {row['city']}): "
        f"{row['review_text']}"
    )

df["input_text"] = df.apply(build_input, axis=1)

# -------------------------
# Train/Val/Test Split
# -------------------------
train_df, test_df = train_test_split(df, test_size=0.1, random_state=SEED)
train_df, val_df = train_test_split(train_df, test_size=0.111, random_state=SEED)

train_ds = Dataset.from_pandas(train_df)
val_ds = Dataset.from_pandas(val_df)
test_ds = Dataset.from_pandas(test_df)

train_ds = train_ds.rename_column("rating", "labels")
val_ds = val_ds.rename_column("rating", "labels")
test_ds = test_ds.rename_column("rating", "labels")

train_ds = train_ds.cast_column("labels", Value("float32"))
val_ds = val_ds.cast_column("labels", Value("float32"))
test_ds = test_ds.cast_column("labels", Value("float32"))

# -------------------------
# Tokenizer
# -------------------------
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)

def tokenize(batch):
    return tokenizer(
        batch["input_text"],
        truncation=True,
        max_length=MAX_LEN
    )

train_ds = train_ds.map(tokenize, batched=True)
val_ds = val_ds.map(tokenize, batched=True)
test_ds = test_ds.map(tokenize, batched=True)

# remove unused columns
cols_to_remove = [
    "review_text", "factor", "university",
    "city", "input_text", "__index_level_0__"
]
train_ds = train_ds.remove_columns([c for c in cols_to_remove if c in train_ds.column_names])
val_ds = val_ds.remove_columns([c for c in cols_to_remove if c in val_ds.column_names])
test_ds = test_ds.remove_columns([c for c in cols_to_remove if c in test_ds.column_names])

# -------------------------
# Model
# -------------------------
model = AutoModelForSequenceClassification.from_pretrained(
    MODEL_NAME,
    num_labels=1,
    problem_type="regression"
)

data_collator = DataCollatorWithPadding(tokenizer=tokenizer)

# -------------------------
# Training Arguments (Improved)
# -------------------------
training_args = TrainingArguments(
    output_dir=OUTPUT_DIR,
    evaluation_strategy="steps",
    eval_steps=200,
    save_steps=200,
    learning_rate=LEARNING_RATE,
    per_device_train_batch_size=BATCH_SIZE,
    per_device_eval_batch_size=BATCH_SIZE,
    num_train_epochs=EPOCHS,
    weight_decay=0.01,
    load_best_model_at_end=True,
    metric_for_best_model="mae",
    greater_is_better=False,
    fp16=torch.cuda.is_available(),
    logging_steps=50,
)

# Early stopping after no improvement in 3 evals
early_stop = EarlyStoppingCallback(early_stopping_patience=3)

trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=train_ds,
    eval_dataset=val_ds,
    tokenizer=tokenizer,
    data_collator=data_collator,
    compute_metrics=compute_metrics,
    callbacks=[early_stop],
)

# -------------------------
# Train
# -------------------------
trainer.train()

# Save best model
trainer.save_model(OUTPUT_DIR)
tokenizer.save_pretrained(OUTPUT_DIR)

# -------------------------
# Test Evaluation
# -------------------------
preds = trainer.predict(test_ds)

logits = preds.predictions.reshape(-1)
labels = preds.label_ids.reshape(-1)

logits = np.clip(logits, 1.0, 5.0)

mae = mean_absolute_error(labels, logits)
rmse = np.sqrt(mean_squared_error(labels, logits))
r2 = r2_score(labels, logits)

print("\n=== TEST METRICS ===")
print("MAE :", mae)
print("RMSE:", rmse)
print("R²  :", r2)

# save predictions
test_out = test_df.copy()
test_out["pred_rating"] = logits
test_out.to_csv(os.path.join(OUTPUT_DIR, "test_predictions.csv"), index=False)

print("\nSaved predictions to test_predictions.csv")
print("Training Complete.")
