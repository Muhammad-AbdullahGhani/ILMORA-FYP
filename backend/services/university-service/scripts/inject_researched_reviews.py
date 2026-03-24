import requests
import json
import random
import os
import pymongo
from pymongo import MongoClient
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# MongoDB connection
MONGO_URI = os.getenv('MONGO_URI', 'mongodb+srv://abdullahghani:1234@cluster0.ehehitv.mongodb.net/university-reviews?retryWrites=true&w=majority')
try:
    client = MongoClient(MONGO_URI)
    db = client.get_database() # Uses the DB in the URI
except pymongo.errors.ConfigurationError:
    print("Configuration error with MongoDB. Please ensure dnspython is installed if using SRV.")
    exit(1)

# Custom, researched reviews for specific universities
REVIEWS = {
    # FAST 
    "FAST": {
        "Job Support": [
            "FAST has arguably the best alumni network in the IT industry in Pakistan. Finding a software engineering job after graduation is almost guaranteed. Top tech companies like Devsinc, Systems Limited, and Motive actively recruit from here.",
            "If you survive the 4 years here, employers know you can handle pressure. The university job fairs are massive and most of my batch got placed before we even graduated.",
            "Excellent job placements, but primarily focused on Computer Science and Software Engineering. The alumni association is very strong.",
            "You practically get hired on the reputation of the university alone in the local software market. Best return on investment for CS students."
        ],
        "Resources": [
            "The computer labs are well-equipped with the latest systems and high-speed internet, but the library gets extremely crowded during sessional exams. More study spaces are definitely needed.",
            "We have access to good digital libraries and standard software licenses. However, physical resources like study rooms and common areas are very limited given the student population."
        ]
    },
    
    # NUST
    "NUST": {
        "Job Support": [
            "NUST graduates are highly preferred in both corporate and engineering sectors. The career development center organizes massive job fairs attracting MNCs and top local firms.",
            "Whether it's engineering, CS, or business, the NUST tag carries a lot of weight. Very strong alumni network globally, especially in the Middle East and US.",
            "The industry linkages are excellent. Many professors bring in real-world projects which translate easily into job offers."
        ],
        "Hostels": [
            "On-campus hostels are decent but getting a room is highly competitive. The merit for hostels is strict, so many students have to find accommodation in H-12 or H-13 outside.",
            "Hostel life is great, food in the mess is average but hygienic. The curfew timings for girls are strictly enforced which some find restrictive."
        ]
    },
    
    # COMSATS
    "COMSAT": {
        "Job Support": [
            "Good job placement for IT and CS graduates. The alumni network is growing rapidly, though some non-IT departments struggle slightly with on-campus recruitment.",
            "A solid reputation in the market. The career office sends regular updates about job openings, but the competition is high among the massive graduating batches.",
            "Most CS graduates find jobs within 3 to 6 months. Software houses in Islamabad heavily recruit from COMSATS."
        ]
    },
    
    # Air University
    "Air University": {
        "Job Support": [
            "Aviation and engineering graduates find good placements due to military connections, but for CS and BBA it's mostly self-effort. Alumni connections are helpful but the university's career office needs to be more active.",
            "The university name carries decent weight, especially in defense organizations. However, dedicated campus recruitment drives from private software houses are less frequent compared to NUST or FAST."
        ]
    },
    
    # Bahria University
    "Bahria University": {
        "Job Support": [
            "Management and CS graduates get decent placements. The alumni association is active in Islamabad, but you have to network on your own to land top-tier jobs.",
            "Good reputation in the local corporate sector. The naval background of the university ensures strict discipline which some employers appreciate. Job fairs are decent.",
            "Alumni network is supportive. Many graduates end up in corporate sector in Islamabad. However, the university career office could do more in terms of interview preparation."
        ],
        "Hostels": [
            "Bahria Islamabad does not have enough on-campus hostel capacity, mostly relying on private hostels in E-8 and F-8 which are expensive. The official hostels are well-maintained though."
        ]
    },
    
    # CUST
    "CUST": {
        "Job Support": [
            "Job fairs happen annually but mostly local software houses visit. The alumni network is growing, but you have to rely heavily on your own skills and portfolio to get hired.",
            "The university is relatively newer so the alumni network isn't as massive as older engineering universities. Good local recognition in Rawalpindi/Islamabad region."
        ]
    },
    
    # PIEAS
    "PIEAS": {
        "Job Support": [
            "PIEAS has incredible job security if you are on an institutional fellowship (like PAEC). For regular fee-paying students, the market reputation is excellent for engineering.",
            "Top-tier engineering graduates. The PAEC connection means many students are absorbed directly into strategic organizations. Excellent return on investment."
        ],
        "Hostels": [
            "Hostel facilities are generally good and most students get accommodation because of the campus location. The environment is highly academic."
        ]
    },
    
    # QAU
    "Quaid": {
        "Job Support": [
            "QAU is unrivaled for natural sciences and research careers. Many graduates go on to fully funded PhDs abroad. The corporate job support is improving but traditionally academically focused.",
            "The alumni network is huge and spans decades. Very strong presence in government sectors and academia."
        ]
    },
    
    # IIUI (Islamic University)
    "Islamic": {
        "Job Support": [
            "IIUI has a massive alumni network, particularly strong in the Middle East and in Islamic Banking sectors. Local software houses do recruit from here, but you have to stand out.",
            "The university provides good basic education but you need to do advanced certifications on your own to compete with top engineering universities in the job market."
        ],
         "Hostels": [
            "The hostel facilities are vast but very highly populated. It's affordable but maintenance can sometimes be an issue due to the sheer number of students."
        ]
    }
}

# Find target universities in DB
universities = list(db.universities.find({}))
reviews_to_insert = []
author_names = ["Ali K.", "Fatima R.", "Usman S.", "Ayesha M.", "Bilal A.", "Zainab N.", "Hamza T.", "Sadia H."]

print("--- Injecting Custom Researched Reviews ---")
for uni in universities:
    uni_name = uni['name']
    uni_id = str(uni['_id'])
    
    # Find matching targeted rules
    for target_key, factors_dict in REVIEWS.items():
        if target_key.lower() in uni_name.lower():
            for factor, factor_reviews in factors_dict.items():
                # Pick 2 random reviews for this factor
                selected = random.sample(factor_reviews, min(2, len(factor_reviews)))
                
                for text in selected:
                    review_doc = {
                        "university": uni_name,
                        "universityId": uni_id,
                        "authorName": random.choice(author_names),
                        "reviewText": text,
                        "factor": factor,
                        "createdAt": "2026-03-01T10:00:00.000Z",
                        "city": uni.get('location', 'Islamabad')
                    }
                    reviews_to_insert.append(review_doc)

print(f"Prepared {len(reviews_to_insert)} customized reviews to inject.")

# Insert into database
if reviews_to_insert:
    db.reviews.insert_many(reviews_to_insert)
    print("Successfully inserted into MongoDB.")
    
    # Clear the sentiment cache so these new reviews get analyzed
    result = db.universities.update_many({}, {"$set": {"cachedSentiment": {}}})
    print(f"Cleared cache for {result.modified_count} universities. The Python service will now pick these up and rate them.")
else:
    print("No matches found to insert.")
