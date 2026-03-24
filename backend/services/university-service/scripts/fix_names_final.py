import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()
client = MongoClient(os.getenv('MONGO_URI'))
db = client['university-reviews']

print("--- Fixing Injected Review 'university' Strings ---")

unis_to_fix = ['Air', 'Bahria', 'CUST', 'FAST', 'Capital', 'GIKI']

for uni_search in unis_to_fix:
    # 1. Find a normal, working review for this university
    normal_review = db.reviews.find_one({
        "factor": "Faculty", # just a default factor that exists
        "university": {"$regex": uni_search, "$options": "i"}
    })
    
    if normal_review:
        correct_frontend_name = normal_review['university']
        print(f"Correct frontend string for {uni_search}: '{correct_frontend_name}'")
        
        # 2. Update all injected reviews (Job Support, Resources, Hostels) for this uni
        res = db.reviews.update_many(
            {
                "factor": {"$in": ["Job Support", "Resources", "Hostels"]},
                "university": {"$regex": uni_search, "$options": "i"}
            },
            {"$set": {"university": correct_frontend_name}}
        )
        print(f"  -> Fixed {res.modified_count} injected reviews to use '{correct_frontend_name}'")
    else:
        print(f"No normal review found for {uni_search} to extract name from.")

# Clear cache
db.universities.update_many({}, {"$set": {"cachedSentiment": {}}})
print("Cleared all sentiment caches.")
