import os
import pymongo
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()
MONGO_URI = os.getenv('MONGO_URI', 'mongodb+srv://abdullahghani:1234@cluster0.ehehitv.mongodb.net/university-reviews?retryWrites=true&w=majority')
client = MongoClient(MONGO_URI)
db = client.get_database()

unis_to_check = ['Air', 'Bahria', 'CUST', 'FAST', 'GIKI', 'Capital']

for uni_str in unis_to_check:
    print(f"\n--- Checking {uni_str} ---")
    uni_docs = list(db.universities.find({'name': {'$regex': uni_str, '$options': 'i'}}))
    for doc in uni_docs:
        name = doc['name']
        api_name = doc.get("apiName", "N/A")
        print(f"Name: {name} | apiName: {api_name}")
        
        # How reviewController.js queries:
        query = {
            "$or": [
                {"university": {"$regex": f"^{name}$", "$options": "i"}},
                {"apiName": {"$regex": f"^{api_name}$", "$options": "i"}}
            ],
            "factor": "Job Support"
        }
        
        job_support_reviews = list(db.reviews.find({'university': name, 'factor': 'Job Support'}))
        match_reviews = list(db.reviews.find(query))
        
        print(f"Job Support Reviews matching EXACT Name: {len(job_support_reviews)}")
        print(f"Job Support Reviews matching Controller Query: {len(match_reviews)}")
        
        cache = doc.get('cachedSentiment', {})
        breakdown = cache.get('ratingBreakdown', {})
        print(f"Cached JobSupport Rating: {breakdown.get('JobSupport', 'Not cached or 0')}")
