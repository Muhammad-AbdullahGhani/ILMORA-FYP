
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Review from '../src/models/Review.js';
import { University } from '../src/models/University.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ilm-ora';

// University-specific details for "proper research" feel
const uniDetails = {
    "NUST": {
        locations: ["H-12", "C1", "C2", "Concordia"],
        features: ["shuttle service", "scenic lake", "horse riding club", "NICE building"],
        pros: ["top-tier research", "industry connections"],
        cons: ["strict grading", "relative grading"]
    },
    "FAST": {
        locations: ["Main Campus", "Cafeteria"],
        features: ["ragging free environment", "coding labs"],
        pros: ["best for CS", "high job placement"],
        cons: ["extremely tough grading", "no social life", "heavy workload"]
    },
    "COMSATS": {
        locations: ["Park Road", "Student Center"],
        features: ["beautiful campus", "bus fleet"],
        pros: ["good faculty", "research focus"],
        cons: ["administrative hurdles", "attendance policy"]
    },
    "Bahria": {
        locations: ["E-8", "Shangrila"],
        features: ["naval discipline", "secure environment"],
        pros: ["good management", "location"],
        cons: ["dress code", "parking issues"]
    },
    "Air": {
        locations: ["E-9", "Margalla backdrop"],
        features: ["PAF management", "disciplined"],
        pros: ["growing reputation", "engineering focus"],
        cons: ["small campus", "strict rules"]
    },
    "IIUI": {
        locations: ["Faisal Mosque", "New Campus"],
        features: ["Islamic architecture", "separate wings"],
        pros: ["affordable", "cultural diversity"],
        cons: ["transport issues", "conservative environment"]
    }
};

const getUniSpecifics = (uniName) => {
    for (const key in uniDetails) {
        if (uniName.includes(key)) return uniDetails[key];
    }
    return {
        locations: ["Main Block", "Student Center", "Library"],
        features: ["green lawns", "auditorium"],
        pros: ["supportive faculty", "good environment"],
        cons: ["administrative delays", "parking shortage"]
    };
};

// Authentic, research-based templates with Pakistani context
const templates = {
    Academics: [
        "The curriculum is rigorous. We study the latest tools like React and Node.js in the final year electives.",
        "Professors are generally PhDs from abroad. {PRO} is a big plus here.",
        "Research culture is growing. The FYP supervision was excellent.",
        "Theory is emphasized too much over practicals. {CON} is a real struggle.",
        "The grading is relative, which makes it very competitive.",
        "Course content is updated every year. We recently added AI tracks.",
        "Teachers are accessible during office hours. They really help you learn.",
        "Exams are tough but fair. If you study the slides, you'll pass.",
        "The degree is recognized by HEC and PEC, so no issues with accreditation.",
        "A lot of focus on theoretical concepts. Good for GRE prep."
    ],
    Faculty: [
        "Faculty is a mix. The permanent faculty is dedicated, but visiting professors often cancel classes.",
        "Most professors hold PhDs. They are very knowledgeable.",
        "Some teachers are very strict about attendance. 75% rule is enforced brutally.",
        "They are helpful if you show interest. I got a recommendation letter easily.",
        "Teaching quality varies. Some just read slides.",
        "The faculty room is always open for students.",
        "Junior lecturers are a bit inexperienced but very enthusiastic.",
        "Senior professors can be a bit arrogant, but they know their stuff.",
        "Overall, the faculty is supportive. {PRO}.",
        "We have some foreign qualified professors who bring a different perspective."
    ],
    "Campus Life": [
        "Campus life is vibrant. There's always some event happening at {LOCATION}.",
        "Societies are very active. The debating society is the best.",
        "It's a strict campus regarding dress code. Guards check ID cards everywhere.",
        "Student politics is banned, so it's peaceful.",
        "The annual welcome party is the highlight of the year.",
        "Ragging is strictly prohibited, which is good for freshers.",
        "The campus environment is safe. {FEATURE} is a nice touch.",
        "Not much to do after 5 PM. The campus becomes quiet.",
        "Great place to make friends. The student center is the main hangout.",
        "Events are well organized. The management supports student initiatives."
    ],
    Facilities: [
        "The library is well-stocked and air-conditioned. Best place to study.",
        "WiFi is available but speed is slow in the hostels.",
        "Classrooms have multimedia projectors and ACs.",
        "The auditorium is state-of-the-art.",
        "Parking is a major issue. {CON}.",
        "Prayer areas are clean and spacious.",
        "Common rooms are well maintained.",
        "The transport system covers the whole city.",
        "Generator backup is there, so load shedding doesn't affect classes.",
        "Water coolers are everywhere."
    ],
    Placements: [
        "Placement office is very active. Companies like Systems and Netsol visit.",
        "They organize a job fair every year. I got my internship through that.",
        "Career counseling is weak. You have to figure out your own path.",
        "Alumni network is strong. Seniors help a lot.",
        "CS and SE graduates get jobs easily. {PRO}.",
        "Average starting salary for grads is decent.",
        "They help with CV writing and interview prep.",
        "Internships are mandatory in the 3rd year.",
        "Top tier companies prefer our grads.",
        "Entrepreneurship incubation center is available."
    ],
    Sports: [
        "Sports facilities are excellent. We have a cricket ground.",
        "The gym is decent but small. It gets crowded.",
        "Table tennis and badminton are popular.",
        "They offer sports scholarships.",
        "Girls' participation in sports is encouraged.",
        "The swimming pool is clean but only open in summers.",
        "Basketball court needs renovation.",
        "Sports week is the most fun time.",
        "We have a strong cricket team.",
        "Equipment in the sports complex is functional."
    ],
    Cafeteria: [
        "The cafeteria food is hygienic and affordable. Biryani is the best.",
        "Prices are subsidized. You can get a full lunch for cheap.",
        "Hygiene is okay. The staff wears caps.",
        "Menu is repetitive. Mostly rice and daal.",
        "There are a few private kiosks which are good.",
        "Seating capacity is less during lunch hours at {LOCATION}.",
        "Tea is great. Everyone gathers for chai.",
        "They accept digital payments.",
        "Food quality has improved recently.",
        "They serve fresh juices."
    ],
    Labs: [
        "Computer labs are equipped with i7 machines.",
        "Electronics labs have all the necessary kits.",
        "We have a dedicated AI lab with GPUs.",
        "Labs are open till 8 PM for projects.",
        "Lab attendants are helpful.",
        "Software licenses are provided.",
        "Chemistry and Physics labs are safe.",
        "Sometimes the internet in labs is restricted.",
        "You need to book the lab in advance.",
        "Printing facilities are available."
    ],
    Resources: [
        "The digital library gives access to IEEE papers.",
        "We get free Microsoft Office accounts.",
        "LMS is used for all assignments.",
        "Photocopy shop on campus is cheap.",
        "Stationery shop has everything.",
        "Online portal is updated regularly.",
        "Access to HEC digital resources.",
        "Funding for final year projects.",
        "E-books are available.",
        "Past papers are in the library."
    ],
    Management: [
        "Management is cooperative but slow. {CON}.",
        "The admin staff can be rude sometimes.",
        "Getting a transcript is a hassle.",
        "They are strict about deadlines.",
        "The student affairs office is helpful.",
        "Management listens to student grievances.",
        "Processes are becoming more digital.",
        "The registrar office is efficient.",
        "They handle security very well.",
        "Fee submission process is smooth."
    ],
    Campus: [
        "The campus is beautiful and green. {FEATURE}.",
        "It's a bit far from the city center.",
        "The architecture is modern.",
        "Cleanliness is maintained throughout the day.",
        "There are lots of trees and sitting areas.",
        "The campus is wheelchair accessible.",
        "Security is very tight at the gates.",
        "The environment is very peaceful.",
        "It feels like a proper university campus.",
        "Maintenance of buildings is good."
    ],
    Hostels: [
        "Hostels are decent but crowded. 3 students per room.",
        "Mess food is average. {CON}.",
        "WiFi in hostels is a major issue.",
        "Laundry facilities are available.",
        "Strict curfew times for students.",
        "The warden is cooperative.",
        "Generator backup is available in hostels.",
        "Common rooms have TV and indoor games.",
        "Cleanliness in washrooms needs improvement.",
        "It's a home away from home. Made great friends."
    ]
};

const cities = ['Islamabad', 'Rawalpindi', 'Lahore', 'Karachi', 'Peshawar'];
const classes = ['Class of 2020', 'Class of 2021', 'Class of 2022', 'Class of 2023', 'Class of 2024', 'Junior Year', 'Senior Year'];

// Helper to escape regex special characters
const escapeRegExp = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

const generateReviews = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB');

        // Get all universities
        const universities = await University.find({});
        console.log(`Found ${universities.length} universities`);

        for (const uni of universities) {
            // Sanitize name for regex
            const sanitizedName = escapeRegExp(uni.name).replace(/[\s\-]+/g, '[\\s\\-]+');
            const query = { university: { $regex: new RegExp(`^${sanitizedName}$`, 'i') } };

            const existingCount = await Review.countDocuments(query);

            // Target universities with < 20 reviews (or force regeneration if we want to update all)
            // For now, let's target those we just generated or are empty
            if (existingCount < 100) { // Increased threshold to catch the ones we just did
                console.log(`Regenerating reviews for ${uni.name} (Current: ${existingCount})...`);

                // Delete existing reviews to start fresh with new factors
                await Review.deleteMany(query);
                console.log(`Deleted existing reviews for ${uni.name}`);

                const reviewsToAdd = [];
                const targetCount = 80 + Math.floor(Math.random() * 11); // 80-90 reviews

                const specifics = getUniSpecifics(uni.name);
                const factorKeys = Object.keys(templates);

                for (let i = 0; i < targetCount; i++) {
                    const factor = factorKeys[i % factorKeys.length];
                    const factorTemplates = templates[factor];
                    let text = factorTemplates[Math.floor(Math.random() * factorTemplates.length)];

                    // Inject specifics
                    text = text.replace('{LOCATION}', specifics.locations[Math.floor(Math.random() * specifics.locations.length)]);
                    text = text.replace('{FEATURE}', specifics.features[Math.floor(Math.random() * specifics.features.length)]);
                    text = text.replace('{PRO}', specifics.pros[Math.floor(Math.random() * specifics.pros.length)]);
                    text = text.replace('{CON}', specifics.cons[Math.floor(Math.random() * specifics.cons.length)]);

                    reviewsToAdd.push({
                        university: uni.name,
                        review_text: text,
                        rating: 3.0 + (Math.random() * 2.0), // 3.0 - 5.0
                        factor: factor,
                        city: cities[Math.floor(Math.random() * cities.length)],
                        authorName: 'Anonymous Alumni',
                        authorClass: classes[Math.floor(Math.random() * classes.length)],
                        isApproved: true,
                        helpful_count: Math.floor(Math.random() * 50),
                        createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000))
                    });
                }

                await Review.insertMany(reviewsToAdd);
                console.log(`Added ${reviewsToAdd.length} comprehensive reviews for ${uni.name}`);
            } else {
                console.log(`Skipping ${uni.name}, has ${existingCount} reviews.`);
            }
        }

        console.log('Review generation complete!');
        process.exit(0);
    } catch (error) {
        console.error('Error generating reviews:', error);
        process.exit(1);
    }
};

generateReviews();
