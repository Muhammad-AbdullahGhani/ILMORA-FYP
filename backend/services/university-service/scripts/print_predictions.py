import requests
import json
from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()
URI = os.getenv('MONGO_URI', 'mongodb+srv://abdullahghani:1234@cluster0.ehehitv.mongodb.net/university-reviews?retryWrites=true&w=majority')
client = MongoClient(URI)
db = client['university-reviews']

revs = list(db.reviews.find({'university': 'FAST-NUCES', 'isApproved': True}).sort('createdAt', -1).limit(30))

payload = {
    'reviews': [
        {
            'review_text': r.get('review_text', ''),
            'factor': r.get('factor', 'Overall'),
            'university': r.get('university', ''),
            'city': r.get('city', '')
        } for r in revs
    ]
}

res = requests.post('http://localhost:5000/predict/batch', json=payload)
data = res.json()

preds = data.get('predictions', [])

with open('predictions_utf8.txt', 'w', encoding='utf-8') as f:
    for i, (r, p) in enumerate(zip(payload['reviews'], preds)):
        f.write(f"{p} | {r['factor'][:10]:<10} | {r['review_text'][:60]}\n")
