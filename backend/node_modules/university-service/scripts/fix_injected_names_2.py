import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()
MONGO_URI = os.getenv('MONGO_URI', 'mongodb+srv://abdullahghani:1234@cluster0.ehehitv.mongodb.net/university-reviews?retryWrites=true&w=majority')
client = MongoClient(MONGO_URI)
db = client['university-reviews']

print("--- Fixing Injected Review Names (Revert) ---")

# Let's see what Job Support reviews exist for 'Air'
air_reviews = list(db.reviews.find({"factor": "Job Support", "university": {"$regex": "air", "$options": "i"}}))
print(f"Air reviews currently in DB: {[r['university'] for r in air_reviews]}")

# Revert logic: we need the review 'university' field to exactly match the university document's 'name' field
unis_to_fix = ['Air', 'Bahria', 'CUST', 'FAST', 'Capital', 'GIKI']
for uni_search in unis_to_fix:
    uni = db.universities.find_one({"name": {"$regex": uni_search, "$options": "i"}})
    if uni:
        correct_name = uni['name']
        print(f"Correct full name for {uni_search}: '{correct_name}'")
        
        # Find reviews that might belong to it but have a different name
        # We know they have factor Job Support and their current name contains the search string
        reviews = db.reviews.find({"factor": "Job Support", "university": {"$regex": uni_search, "$options": "i"}})
        
        count = 0
        for r in reviews:
            if r['university'] != correct_name:
                db.reviews.update_one({"_id": r["_id"]}, {"$set": {"university": correct_name}})
                count += 1
        print(f"  Fixed {count} reviews to match '{correct_name}'")

# Clear the sentiment cache for all to force re-evaluation
db.universities.update_many({}, {"$set": {"cachedSentiment": {}}})
print("Cleared cache.")
