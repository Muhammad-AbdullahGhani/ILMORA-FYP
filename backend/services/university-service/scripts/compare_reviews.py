import os
from pymongo import MongoClient
import json
from bson.json_util import dumps
from dotenv import load_dotenv

load_dotenv()
MONGO_URI = os.getenv('MONGO_URI', 'mongodb+srv://abdullahghani:1234@cluster0.ehehitv.mongodb.net/university-reviews?retryWrites=true&w=majority')
client = MongoClient(MONGO_URI)
db = client['university-reviews']

print("--- Side-by-Side Review Comparison ---")

# 1. Get a normal working review
normal = db.reviews.find_one({"isApproved": True, "factor": {"$ne": "Job Support"}})
print("NORMAL REVIEW KEYS:")
print(list(normal.keys()) if normal else "None")

# 2. Get an injected job support review
injected = db.reviews.find_one({"factor": "Job Support", "university": {"$regex": "air", "$options": "i"}})
print("\nINJECTED REVIEW KEYS:")
print(list(injected.keys()) if injected else "None")

# 3. Print differences
if normal and injected:
    print("\nMissing keys in injected review:")
    for k in normal.keys():
        if k not in injected:
            print(f"- {k}")

    print("\nFull Injected Document:")
    print(dumps(injected, indent=2))
