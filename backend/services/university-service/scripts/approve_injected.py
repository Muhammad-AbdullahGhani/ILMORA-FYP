import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()
MONGO_URI = os.getenv('MONGO_URI', 'mongodb+srv://abdullahghani:1234@cluster0.ehehitv.mongodb.net/university-reviews?retryWrites=true&w=majority')
client = MongoClient(MONGO_URI)
db = client['university-reviews']

print("--- Fixing 'isApproved' Flag on Injected Reviews ---")

# Step 1: Update all Job Support and Resources reviews to have isApproved = True
# Since they were injected by the script manually without this flag
result_update = db.reviews.update_many(
    {
        "factor": {"$in": ["Job Support", "Resources", "Hostels"]},
        "isApproved": {"$exists": False} # target those without the flag
    },
    {"$set": {"isApproved": True}}
)

print(f"Updated {result_update.modified_count} injected reviews to be 'isApproved: True'.")

# Step 2: Clear cache for all universities to force recalculation with the new approved reviews
res_cache = db.universities.update_many(
    {},
    {"$set": {"cachedSentiment": {}}}
)
print(f"Cleared cache for {res_cache.modified_count} universities.")

print("Run check_api.py now to verify.")
