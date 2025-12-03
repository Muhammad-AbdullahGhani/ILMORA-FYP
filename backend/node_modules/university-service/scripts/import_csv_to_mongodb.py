"""
Import university reviews from CSV to MongoDB
This script imports your 2000 training reviews into the database
"""

import pandas as pd
import pymongo
from datetime import datetime
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# MongoDB connection
MONGO_URI = os.getenv('MONGO_URI', 'mongodb+srv://abdullahghani:1234@cluster0.ehehitv.mongodb.net/university-reviews?retryWrites=true&w=majority')

# CSV file path
CSV_PATH = "university_reviews_2000_researched.csv"

def import_reviews():
    print("=" * 70)
    print("IMPORTING REVIEWS FROM CSV TO MONGODB")
    print("=" * 70)
    
    # Connect to MongoDB
    print("\n[1/4] Connecting to MongoDB...")
    client = pymongo.MongoClient(MONGO_URI)
    db = client['university-reviews']
    collection = db['reviews']
    print("✓ Connected successfully")
    
    # Read CSV
    print(f"\n[2/4] Reading CSV file: {CSV_PATH}")
    if not os.path.exists(CSV_PATH):
        print(f"❌ ERROR: CSV file not found at {CSV_PATH}")
        return
    
    df = pd.read_csv(CSV_PATH)
    print(f"✓ Loaded {len(df)} reviews from CSV")
    
    # Clear existing data
    print("\n[3/4] Clearing existing reviews...")
    result = collection.delete_many({})
    print(f"✓ Deleted {result.deleted_count} existing reviews")
    
    # Prepare documents
    print("\n[4/4] Importing reviews to MongoDB...")
    documents = []
    timestamp = datetime.now()
    
    for idx, row in df.iterrows():
        doc = {
            'university': str(row['university']).strip(),
            'city': str(row['city']).strip(),
            'factor': str(row['factor']).strip(),
            'reviewText': str(row['review_text']).strip(),
            'authorName': 'Anonymous',
            'isApproved': True,
            'likes': 0,
            'reports': 0,
            'createdAt': timestamp,
            'updatedAt': timestamp
        }
        documents.append(doc)
        
        if (idx + 1) % 100 == 0:
            print(f"  Processed {idx + 1}/{len(df)} reviews...")
    
    result = collection.insert_many(documents)
    print(f"\n✓ Successfully imported {len(result.inserted_ids)} reviews!")
    
    print("\n" + "=" * 70)
    print("IMPORT COMPLETE!")
    print("=" * 70)
    
    # Count by university
    print("\nReviews by University:")
    pipeline = [
        {'$group': {'_id': '$university', 'count': {'$sum': 1}}}
    ]
    for item in collection.aggregate(pipeline):
        print(f"  {item['_id']}: {item['count']} reviews")
    
    # Count by factor
    print("\nReviews by Factor:")
    pipeline = [
        {'$group': {'_id': '$factor', 'count': {'$sum': 1}}}
    ]
    for item in collection.aggregate(pipeline):
        print(f"  {item['_id']}: {item['count']} reviews")
    
    print("\n" + "=" * 70)
    print("🎉 Your database is ready!")
    print("=" * 70)
    
    client.close()

if __name__ == "__main__":
    try:
        import_reviews()
    except Exception as e:
        print(f"\n❌ ERROR: {e}")
