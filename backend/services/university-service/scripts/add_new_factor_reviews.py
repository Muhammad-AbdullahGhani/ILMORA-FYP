"""
Add ALL real survey reviews from training_data_with_job_support.csv to MongoDB
WITHOUT deleting existing reviews.

This appends all 11 factors (including the new Job Support + Events) from 
real survey data on top of whatever is already in MongoDB.
"""

import pandas as pd
import pymongo
from datetime import datetime
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv('MONGO_URI', 'mongodb+srv://abdullahghani:1234@cluster0.ehehitv.mongodb.net/university-reviews?retryWrites=true&w=majority')
CSV_PATH = "training_data_with_job_support.csv"

def add_new_reviews():
    print("=" * 70)
    print("ADDING ALL REAL SURVEY REVIEWS TO MONGODB (keeping old reviews)")
    print("=" * 70)

    # Connect to MongoDB
    print("\n[1/4] Connecting to MongoDB...")
    client = pymongo.MongoClient(MONGO_URI)
    db = client['university-reviews']
    collection = db['reviews']
    print("✓ Connected successfully")

    # Read CSV
    print(f"\n[2/4] Reading CSV file: {CSV_PATH}")
    df = pd.read_csv(CSV_PATH)
    print(f"✓ Loaded {len(df)} total rows from CSV")
    print(f"  Factor counts:\n{df['factor'].value_counts().to_string()}")
    new_df = df  # use all rows

    # Show existing review counts
    print("\n[3/4] Existing review counts in MongoDB by factor:")
    for factor in df['factor'].unique():
        existing = collection.count_documents({'factor': factor})
        print(f"  {factor}: {existing} existing reviews")

    # Prepare documents
    print("\n[4/4] Inserting new reviews...")
    documents = []
    timestamp = datetime.now()

    for idx, row in new_df.iterrows():
        review_text = str(row.get('review_text', '')).strip()
        if not review_text or review_text == 'nan' or len(review_text) < 5:
            continue

        doc = {
            'university': str(row['university']).strip(),
            'city': str(row.get('city', 'Islamabad')).strip(),
            'factor': str(row['factor']).strip(),
            'review_text': review_text,
            'rating': float(row['rating']),
            'authorName': 'Anonymous Alumni',
            'authorClass': str(row.get('reviewer_type', 'Alumni')),
            'isApproved': True,
            'helpful_count': 0,
            'createdAt': timestamp,
            'updatedAt': timestamp
        }
        documents.append(doc)

    if documents:
        result = collection.insert_many(documents)
        print(f"\n✓ Successfully inserted {len(result.inserted_ids)} new reviews!")
    else:
        print("\n⚠ No valid documents to insert.")

    # Show final counts
    print("\nFinal review counts per factor:")
    for factor in df['factor'].unique():
        count = collection.count_documents({'factor': factor})
        print(f"  {factor}: {count} reviews")

    print("\n" + "=" * 70)
    print("✓ Done! All real survey reviews added. Old reviews preserved.")
    print("=" * 70)

    client.close()

if __name__ == "__main__":
    try:
        add_new_reviews()
    except Exception as e:
        print(f"\n❌ ERROR: {e}")
        import traceback
        traceback.print_exc()
