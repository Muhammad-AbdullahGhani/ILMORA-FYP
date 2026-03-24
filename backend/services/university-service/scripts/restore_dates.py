import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()
MONGO_URI = os.getenv('MONGO_URI', 'mongodb+srv://abdullahghani:1234@cluster0.ehehitv.mongodb.net/university-reviews?retryWrites=true&w=majority')
client = MongoClient(MONGO_URI)
db = client['university-reviews']

print("--- Restoring True CreatedAt Dates from ObjectIds ---")

# We will iterate through all reviews and set their createdAt field
# to the exact timestamp encoded in their MongoDB ObjectId.
# This perfectly restores the chronological order.

reviews = list(db.reviews.find({}))
count = 0

for r in reviews:
    _id = r['_id']
    # The generation_time property gives the exact UTC datetime the ObjectId was created!
    original_date = _id.generation_time
    
    db.reviews.update_one(
        {"_id": _id},
        {"$set": {"createdAt": original_date}}
    )
    count += 1
    if count % 100 == 0:
        print(f"Restored {count} reviews...")

print(f"Successfully restored true chronological timestamps for all {count} reviews.")

# We also need to clear the sentiment caches so the stats are recalculated 
# using the newly resorted top 30 reviews.
res_cache = db.universities.update_many({}, {"$set": {"cachedSentiment": {}}})
print(f"Cleared sentiment cache for {res_cache.modified_count} universities.")

print("Fix completed! The charts should now display all factors correctly.")
