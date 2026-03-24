import os
from pymongo import MongoClient
import datetime
from dotenv import load_dotenv

load_dotenv()
client = MongoClient(os.getenv('MONGO_URI'))
db = client['university-reviews']

print("--- Fixing Review Dates to Ensure Visibility ---")

# The backend limits stats generation to the latest 30 reviews sorted by createdAt.
# Our injected reviews used string dates, pushing them down the sort order out of the top 30!
# We will explicitly make them true Date objects from 'now' so they are guaranteed to be featured.

now = datetime.datetime.utcnow()

res = db.reviews.update_many(
    {
        "factor": {"$in": ["Job Support", "Resources", "Hostels", "Events"]}
    },
    {
        "$set": {
            "createdAt": now
        }
    }
)

print(f"Updated {res.modified_count} injected reviews to use REAL current Date objects.")

# Clear cache again
res_cache = db.universities.update_many({}, {"$set": {"cachedSentiment": {}}})
print("Cleared sentiment caches.")
