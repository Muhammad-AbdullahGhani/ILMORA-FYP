import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()
MONGO_URI = os.getenv('MONGO_URI', 'mongodb+srv://abdullahghani:1234@cluster0.ehehitv.mongodb.net/university-reviews?retryWrites=true&w=majority')
client = MongoClient(MONGO_URI)
db = client.get_database()

print("--- Fixing Injected Review Names ---")

# Step 1: Strip everything after comma for injected 'Job Support' and 'Resources' reviews so they match exactly what's expected
reviews_to_fix = list(db.reviews.find({
    "factor": {"$in": ["Job Support", "Resources", "Hostels"]},
    "university": {"$regex": ","} # Means it has a comma suffix like ', Islamabad'
}))

count = 0
for review in reviews_to_fix:
    full_name = review['university']
    short_name = full_name.split(',')[0].strip()
    
    # Update the review in the database
    db.reviews.update_one(
        {"_id": review["_id"]},
        {"$set": {"university": short_name}}
    )
    count += 1

print(f"Fixed {count} injected reviews to use the short name (e.g., 'FAST-NUCES' instead of 'FAST-NUCES, Islamabad').")

# Step 2: Clear cache for all universities to force recalculation
res_cache = db.universities.update_many(
    {},
    {"$set": {"cachedSentiment": {}}}
)
print(f"Cleared cache for {res_cache.modified_count} universities.")
