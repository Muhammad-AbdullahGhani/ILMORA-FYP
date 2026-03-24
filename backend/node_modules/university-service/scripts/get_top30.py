from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()
URI = os.getenv('MONGO_URI', 'mongodb+srv://abdullahghani:1234@cluster0.ehehitv.mongodb.net/university-reviews?retryWrites=true&w=majority')
client = MongoClient(URI)
db = client['university-reviews']

revs = list(db.reviews.find({'university': 'FAST-NUCES', 'isApproved': True}).sort('createdAt', -1).limit(30))

with open('top30.txt', 'w', encoding='utf-8') as f:
    for i, r in enumerate(revs):
        f.write(f"{i+1}. [{r.get('factor')}] {r.get('review_text')[:150]}...\n")

print(f"Wrote {len(revs)} reviews to top30.txt")
