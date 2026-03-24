import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()
client = MongoClient(os.getenv('MONGO_URI'))
db = client['university-reviews']

n = db.reviews.find_one({"isApproved": True, "factor": {"$ne": "Job Support"}})
i = db.reviews.find_one({"factor": "Job Support", "university": {"$regex": "air", "$options": "i"}})

print("Normal keys:", list(n.keys()) if n else "None")
print("Injected keys:", list(i.keys()) if i else "None")

if n and i:
    print("Missing in injected:")
    for k in n.keys():
        if k not in i:
            print(f"- {k}")
