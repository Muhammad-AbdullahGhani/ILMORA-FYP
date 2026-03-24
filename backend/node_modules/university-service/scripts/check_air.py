import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()
client = MongoClient(os.getenv('MONGO_URI'))
db = client['university-reviews']

for uni_search in ['Air', 'Bahria', 'CUST', 'GIKI']:
    uni = db.universities.find_one({'name': {'$regex': uni_search, '$options': 'i'}})
    if uni:
        name = uni.get('name')
        apiName = uni.get('apiName')
        print(f"--- {uni_search} ---")
        print(f"University Document Name: '{name}'")
        print(f"University Document apiName: '{apiName}'")
        
        r_all = list(db.reviews.find({'university': {'$regex': uni_search, '$options': 'i'}, 'factor': 'Job Support'}))
        print(f"Found {len(r_all)} Job Support reviews containing '{uni_search}'.")
        for r in r_all:
            print(f"  -> Injected Review 'university' string: '{r.get('university')}'")
        print()
