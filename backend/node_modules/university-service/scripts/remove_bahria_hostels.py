import os
from pymongo import MongoClient
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

MONGO_URI = os.getenv('MONGO_URI', 'mongodb+srv://abdullahghani:1234@cluster0.ehehitv.mongodb.net/university-reviews?retryWrites=true&w=majority')
client = MongoClient(MONGO_URI)
db = client.get_database()

# Delete Hostel reviews for Bahria to keep it at 0
result_delete = db.reviews.delete_many({
    "university": {"$regex": "Bahria", "$options": "i"},
    "factor": "Hostels"
})

print(f"Deleted {result_delete.deleted_count} Hostel reviews for Bahria.")

# Clear cache for Bahria
result_cache = db.universities.update_many(
    {"name": {"$regex": "Bahria", "$options": "i"}},
    {"$set": {"cachedSentiment": {}}}
)
print(f"Cleared cache for {result_cache.modified_count} Bahria university entries.")
