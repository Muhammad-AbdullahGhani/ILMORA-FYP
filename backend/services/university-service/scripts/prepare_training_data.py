"""
Prepare training data from FINAL_DATASET.csv (survey format) 
into the flat format needed by train.py:
    university, city, factor, review_text, rating

Each survey row has multiple Rating/Explain pairs that get unpivoted
into individual training rows.
"""

import pandas as pd
import os

INPUT_CSV = os.path.join(os.path.dirname(__file__), "FINAL_DATASET.csv")
OUTPUT_CSV = os.path.join(os.path.dirname(__file__), "training_data_with_job_support.csv")

# Mapping: (rating_col, explain_col) -> factor name
FACTOR_MAPPING = {
    ("Faculty_Rating", "Faculty_Explain"): "Faculty",
    ("Resources_Rating", "Resources_Explain"): "Resources",
    ("Labs_Rating", "Labs_Explain"): "Labs",
    ("Sports_Rating", "Sports_Explain"): "Sports",
    ("Cafe_Rating", "Cafe_Explain"): "Cafeteria",
    ("Hostel_Rating", "Hostel_Explain"): "Hostel",
    ("Events_Rating", "Events_Explain"): "Events",
    ("Campus_Rating", "Campus_Explain"): "Campus",
    ("Mgmt_Rating", "Mgmt_Explain"): "Management",
    ("Overall_Rating", "Overall_Explain"): "Overall",
    ("Job_Support_Rating", "Job_Support_Explain"): "Job Support",
}


def prepare_data():
    print("=" * 60)
    print("PREPARING TRAINING DATA FROM FINAL_DATASET.csv")
    print("=" * 60)

    df = pd.read_csv(INPUT_CSV)
    print(f"\n[1/3] Loaded {len(df)} survey rows from {os.path.basename(INPUT_CSV)}")
    print(f"      Universities: {df['University'].nunique()}")
    print(f"      Columns: {len(df.columns)}")

    records = []
    skipped = 0

    for idx, row in df.iterrows():
        university = str(row.get("University", "")).strip()
        city = str(row.get("City", "")).strip()

        if not university or university == "nan":
            skipped += 1
            continue

        # Default city to Islamabad if missing
        if not city or city == "nan":
            city = "Islamabad"

        for (rating_col, explain_col), factor in FACTOR_MAPPING.items():
            # Get rating
            try:
                rating = float(row.get(rating_col, 0))
            except (ValueError, TypeError):
                continue

            if rating < 1 or rating > 5:
                continue

            # Get explanation text
            text = str(row.get(explain_col, "")).strip()
            if not text or text == "nan" or len(text) < 5:
                continue

            records.append({
                "university": university,
                "city": city,
                "department": "General",
                "factor": factor,
                "reviewer_type": "Alumni",
                "review_text": text,
                "rating": int(rating),
            })

    result_df = pd.DataFrame(records)

    print(f"\n[2/3] Unpivoted into {len(result_df)} training rows ({skipped} survey rows skipped)")
    print(f"\n      Factor distribution:")
    for factor, count in result_df["factor"].value_counts().items():
        print(f"        {factor}: {count}")

    print(f"\n      University distribution:")
    for uni, count in result_df["university"].value_counts().items():
        print(f"        {uni}: {count}")

    print(f"\n      Rating distribution:")
    for rating, count in result_df["rating"].value_counts().sort_index().items():
        print(f"        {rating} star: {count}")

    # Load original 2000 reviews dataset
    old_csv_path = os.path.join(os.path.dirname(__file__), "university_reviews_2000_researched.csv")
    if os.path.exists(old_csv_path):
        print(f"\n[3/4] Merging with existing dataset: {os.path.basename(old_csv_path)}")
        old_df = pd.read_csv(old_csv_path)
        # Drop unnamed columns if any
        old_df = old_df.loc[:, ~old_df.columns.str.contains('^Unnamed')]
        result_df = pd.concat([old_df, result_df], ignore_index=True)
        print(f"      Total combined training rows: {len(result_df)}")
    else:
        print(f"\n[3/4] Warning: Original dataset {os.path.basename(old_csv_path)} not found. Skipping merge.")

    # Save
    result_df.to_csv(OUTPUT_CSV, index=False)
    print(f"\n[4/4] Saved to {os.path.basename(OUTPUT_CSV)}")
    print(f"\n{'=' * 60}")
    print("✓ Training data preparation complete!")
    print(f"{'=' * 60}")


if __name__ == "__main__":
    prepare_data()
