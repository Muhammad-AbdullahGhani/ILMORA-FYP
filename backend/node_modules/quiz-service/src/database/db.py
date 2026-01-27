# backend/services/quiz-service/src/database/db.py
from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

# MongoDB Connection
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/")
DB_NAME = os.getenv("DB_NAME", "quiz_db")

client = None
db = None

def connect_db():
    """Initialize MongoDB connection"""
    global client, db
    try:
        client = MongoClient(MONGO_URI)
        db = client[DB_NAME]
        # Test connection
        client.admin.command('ping')
        print(f"✅ Connected to MongoDB: {DB_NAME}")
        
        # Create indexes for better performance
        db.quiz_sessions.create_index("session_id", unique=True)
        db.quiz_sessions.create_index("user_id")
        db.quiz_sessions.create_index([("user_id", 1), ("created_at", -1)])
        
        db.quiz_results.create_index("session_id", unique=True)
        db.quiz_results.create_index("user_id")
        db.quiz_results.create_index([("user_id", 1), ("completed_at", -1)])
        
        return db
    except Exception as e:
        print(f"❌ Failed to connect to MongoDB: {e}")
        raise e

def get_db():
    """Get database instance"""
    global db
    if db is None:
        connect_db()
    return db

def close_db():
    """Close MongoDB connection"""
    global client
    if client:
        client.close()
        print("✅ MongoDB connection closed")
