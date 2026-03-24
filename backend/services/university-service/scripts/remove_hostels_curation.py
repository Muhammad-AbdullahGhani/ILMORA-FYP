import os
import pymongo
from pymongo import MongoClient
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# MongoDB connection
MONGO_URI = os.getenv('MONGO_URI', 'mongodb+srv://abdullahghani:1234@cluster0.ehehitv.mongodb.net/university-reviews?retryWrites=true&w=majority')
try:
    client = MongoClient(MONGO_URI)
    db = client.get_database() 
except Exception as e:
    print(f"Error connecting to MongoDB: {e}")
    exit(1)

# List of universities without internal hostels
non_hostel_unis = [
    "Air University",
    "FAST",
    "COMSAT",
    "Capital University",
    "CUST",
    "Federal Urdu University",
    "Foundation University"
]

print("--- Curating Data: Removing Non-Existent Hostel Reviews ---")

for uni_pattern in non_hostel_unis:
    # Delete Hostel reviews
    res_delete = db.reviews.delete_many({
        "university": {"$regex": uni_pattern, "$options": "i"},
        "factor": "Hostels"
    })
    
    # Clear Cache for these universities
    res_cache = db.universities.update_many(
        {"name": {"$regex": uni_pattern, "$options": "i"}},
        {"$set": {"cachedSentiment": {}}}
    )
    
    print(f"[{uni_pattern}] Deleted {res_delete.deleted_count} reviews. Cleared cache for {res_cache.modified_count} entries.")

print("\nCuration Complete! These universities will now show 0 for Hostels on the frontend.")
