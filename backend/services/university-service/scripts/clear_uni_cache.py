import pymongo
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv('MONGO_URI', 'mongodb+srv://abdullahghani:1234@cluster0.ehehitv.mongodb.net/university-reviews?retryWrites=true&w=majority')

def clear_cache():
    print("Connecting to MongoDB...")
    client = pymongo.MongoClient(MONGO_URI)
    db = client['university-reviews']
    collection = db['universities']
    
    print("Clearing cachedSentiment for all universities...")
    result = collection.update_many({}, {"$set": {"cachedSentiment": {}}})
    print(f"✓ Updated {result.modified_count} universities.")
    
    client.close()

if __name__ == "__main__":
    clear_cache()
