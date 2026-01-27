"""
Populate MongoDB with sample reviews using the AI model for predictions
"""

import requests
import json

# Sample reviews for NUST
sample_reviews = [
    {
        "review_text": "The faculty is world-class and research opportunities are incredible. Best decision of my life!",
        "factor": "Faculty",
        "university": "NUST",
        "city": "Islamabad",
        "authorName": "Ahmed Khan",
        "authorClass": "Class of 2024"
    },
    {
        "review_text": "Amazing campus life with great extracurricular activities and sports facilities.",
        "factor": "Campus Life",
        "university": "NUST",
        "city": "Islamabad",
        "authorName": "Sara Ali",
        "authorClass": "Class of 2023"
    },
    {
        "review_text": "The academic curriculum is rigorous and prepares you well for industry.",
        "factor": "Academics",
        "university": "NUST",
        "city": "Islamabad",
        "authorName": "Hassan Raza",
        "authorClass": "Class of 2025"
    },
    {
        "review_text": "Excellent placement opportunities with top companies visiting campus regularly.",
        "factor": "Placements",
        "university": "NUST",
        "city": "Islamabad",
        "authorName": "Fatima Noor",
        "authorClass": "Class of 2022"
    },
    {
        "review_text": "Facilities could be better, some labs need upgrading.",
        "factor": "Facilities",
        "university": "NUST",
        "city": "Islamabad",
        "authorName": "Ali Hamza",
        "authorClass": "Class of 2024"
    }
]

print("=" * 60)
print("Populating MongoDB with AI-Predicted Reviews")
print("=" * 60)

for i, review in enumerate(sample_reviews, 1):
    print(f"\n[{i}/{len(sample_reviews)}] Processing review by {review['authorName']}...")
    print(f"   Factor: {review['factor']}")
    print(f"   Preview: {review['review_text'][:50]}...")
    
    # Get AI prediction
    try:
        pred_response = requests.post(
            'http://localhost:3005/predict',
            json={
                'review_text': review['review_text'],
                'factor': review['factor'],
                'university': review['university'],
                'city': review['city']
            },
            timeout=10
        )
        
        if pred_response.status_code == 200:
            prediction = pred_response.json()
            rating = prediction.get('rating', 0)
            print(f"   ✓ AI Predicted Rating: {rating}/5.0")
            
            # Add review to MongoDB (you'll need to implement this endpoint)
            review_data = {
                **review,
                'rating': rating,
                'predictedRating': rating
            }
            
            # For now, just print the data
            # In production, you'd POST this to your MongoDB API
            print(f"   ✓ Review ready for database")
            print(f"   Data: {json.dumps(review_data, indent=2)}")
            
        else:
            print(f"   ❌ Prediction failed: {pred_response.status_code}")
            
    except Exception as e:
        print(f"   ❌ Error: {e}")

print("\n" + "=" * 60)
print("✓ Sample reviews processed!")
print("=" * 60)
print("\nTo save these to MongoDB, you need to:")
print("1. Implement POST /api/reviews endpoint in your Node.js backend")
print("2. Update this script to call that endpoint")
print("3. Or manually insert the data shown above")
