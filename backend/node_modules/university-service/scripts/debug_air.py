import os
from pymongo import MongoClient
import json
from bson.json_util import dumps
from dotenv import load_dotenv

load_dotenv()
MONGO_URI = os.getenv('MONGO_URI', 'mongodb+srv://abdullahghani:1234@cluster0.ehehitv.mongodb.net/university-reviews?retryWrites=true&w=majority')
client = MongoClient(MONGO_URI)
db = client['university-reviews']

print("--- Dumping Air University Job Support Review ---")

air_reviews = list(db.reviews.find({"factor": "Job Support", "university": {"$regex": "air", "$options": "i"}}))

if not air_reviews:
    print("No Job Support reviews found for 'Air' in DB at all!")
else:
    print(f"Found {len(air_reviews)} reviews.")
    print("Sample Review:")
    print(dumps(air_reviews[0], indent=2))
    
    # Check if 'Air University, Islamabad' exists in db.universities
    uni = db.universities.find_one({"name": {"$regex": "air", "$options": "i"}})
    print("\nCorresponding University Doc:")
    print(dumps(uni, indent=2))
