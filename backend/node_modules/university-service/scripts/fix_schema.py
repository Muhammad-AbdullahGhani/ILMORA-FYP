import os
from pymongo import MongoClient
import random
from dotenv import load_dotenv

load_dotenv()
MONGO_URI = os.getenv('MONGO_URI', 'mongodb+srv://abdullahghani:1234@cluster0.ehehitv.mongodb.net/university-reviews?retryWrites=true&w=majority')
client = MongoClient(MONGO_URI)
db = client['university-reviews']

print("--- Fixing Review Schema Fields ---")

# Find all injected reviews missing the 'review_text' field
reviews_to_fix = list(db.reviews.find({"factor": {"$in": ["Job Support", "Resources", "Hostels"]}, "review_text": {"$exists": False}}))

count = 0
for r in reviews_to_fix:
    update_fields = {}
    
    # Rename reviewText -> review_text
    if 'reviewText' in r:
        update_fields['review_text'] = r['reviewText']
        
    # Add an implicit positive rating since we wrote positive/mixed reviews
    if 'rating' not in r:
        update_fields['rating'] = round(random.uniform(4.0, 5.0), 1)
        
    if update_fields:
        db.reviews.update_one(
            {"_id": r["_id"]},
            {
                "$set": update_fields,
                "$unset": {"reviewText": ""} # Remove the incorrect field
            }
        )
        count += 1

print(f"Fixed schema fields for {count} injected reviews.")

# Clear the cache
res_cache = db.universities.update_many({}, {"$set": {"cachedSentiment": {}}})
print(f"Cleared cache for {res_cache.modified_count} universities.")
