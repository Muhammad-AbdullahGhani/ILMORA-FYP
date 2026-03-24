import dotenv from 'dotenv';
import mongoose from 'mongoose';
import fs from 'fs';

// Load env
dotenv.config();
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://abdullahghani:1234@cluster0.ehehitv.mongodb.net/university-reviews?retryWrites=true&w=majority';

// Import Mongoose Models identically to backend
const reviewSchema = new mongoose.Schema({
    review_text: { type: String, required: true },
    rating: { type: Number, required: true },
    factor: { type: String, required: true },
    university: { type: String, required: true },
    city: { type: String, required: true },
    authorName: { type: String, default: 'Anonymous' },
    isApproved: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
});
const Review = mongoose.models.Review || mongoose.model('Review', reviewSchema);

const universitySchema = new mongoose.Schema({
    name: String,
    apiName: String,
    location: String,
    cachedSentiment: Object
});
const University = mongoose.models.University || mongoose.model('University', universitySchema);

const REVIEWS = {
    // FAST 
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
    // NUST
    "NUST": {
        "Job Support": [
            "NUST graduates are highly preferred in both corporate and engineering sectors. The career development center organizes massive job fairs attracting MNCs and top local firms.",
            "Whether it's engineering, CS, or business, the NUST tag carries a lot of weight. Very strong alumni network globally, especially in the Middle East and US.",
            "The industry linkages are excellent. Many professors bring in real-world projects which translate easily into job offers."
        ]
    },
    // COMSAT
    "COMSAT": {
        "Job Support": [
            "Good job placement for IT and CS graduates. The alumni network is growing rapidly, though some non-IT departments struggle slightly with on-campus recruitment.",
            "Most CS graduates find jobs within 3 to 6 months. Software houses in Islamabad heavily recruit from COMSATS."
        ]
    },
    // Air University
    "Air University": {
        "Job Support": [
            "Aviation and engineering graduates find good placements due to military connections, but for CS and BBA it's mostly self-effort. Alumni connections are helpful but the university's career office needs to be more active.",
            "The university name carries decent weight, especially in defense organizations. However, dedicated campus recruitment drives from private software houses are less frequent compared to NUST or FAST."
        ]
    },
    // Bahria University
    "Bahria University": {
        "Job Support": [
            "Management and CS graduates get decent placements. The alumni association is active in Islamabad, but you have to network on your own to land top-tier jobs.",
            "Good reputation in the local corporate sector. The naval background of the university ensures strict discipline which some employers appreciate. Job fairs are decent."
        ]
    },
    // CUST
    "CUST": {
        "Job Support": [
            "Job fairs happen annually but mostly local software houses visit. The alumni network is growing, but you have to rely heavily on your own skills and portfolio to get hired.",
            "The university is relatively newer so the alumni network isn't as massive as older engineering universities. Good local recognition in Rawalpindi/Islamabad region."
        ]
    },
    // PIEAS
    "PIEAS": {
        "Job Support": [
            "PIEAS has incredible job security if you are on an institutional fellowship (like PAEC). For regular fee-paying students, the market reputation is excellent for engineering."
        ]
    },
    // Quaid
    "Quaid": {
        "Job Support": [
            "QAU is unrivaled for natural sciences and research careers. Many graduates go on to fully funded PhDs abroad. The corporate job support is improving but traditionally academically focused."
        ]
    },
    // IIUI
    "Islamic": {
        "Job Support": [
            "IIUI has a massive alumni network, particularly strong in the Middle East and in Islamic Banking sectors. Local software houses do recruit from here, but you have to stand out."
        ]
    },
    // BNU
    "Beaconhouse": {
        "Job Support": [
            "BNU is good for arts and media, but the university itself doesn't offer much in terms of formal campus recruitment. You really have to hustle on your own to find a job.",
            "The career office is practically non-existent. While alumni are doing well in creative fields, the university provides very little direct support for placements.",
            "If you want a corporate job, BNU won't help much. Most students end up freelancing or finding internships entirely through personal connections rather than university support."
        ]
    }
};

async function injectMongoose() {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB via Mongoose.");

    const allUnis = await University.find({});
    const authorNames = ["Ali K.", "Fatima R.", "Usman S.", "Ayesha M.", "Bilal A.", "Zainab N.", "Hamza T.", "Sadia H."];

    // Clean up any old injected ones we messed up to avoid duplicates
    // Not necessary if they are completely hidden, but good practice
    // We'll just insert new PERFECT ones.

    let totalInserted = 0;

    for (const uni of allUnis) {
        const uniName = uni.name;
        const searchName = uni.apiName || uniName; // Use apiName if it exists for normal DB matches

        // Find matching targeted rules
        for (const [targetKey, factorsDict] of Object.entries(REVIEWS)) {
            const matchesName = uniName.toLowerCase().includes(targetKey.toLowerCase());
            const matchesApi = uni.apiName && uni.apiName.toLowerCase().includes(targetKey.toLowerCase());
            if (matchesName || matchesApi) {
                for (const [factor, reviews] of Object.entries(factorsDict)) {
                    console.log(`Injecting ${reviews.length} ${factor} reviews for ${uniName}...`);

                    for (const text of reviews) {
                        await Review.create({
                            university: searchName, // This is exactly what the frontend uses!
                            authorName: authorNames[Math.floor(Math.random() * authorNames.length)],
                            review_text: text,
                            factor: factor,
                            rating: Number((Math.random() * (5.0 - 4.0) + 4.0).toFixed(1)), // 4.0 - 5.0
                            city: uni.location || 'Islamabad',
                            isApproved: true,
                            createdAt: new Date() // VERY IMPORTANT - Ensures it's grabbed by the top 30 check
                        });
                        totalInserted++;
                    }
                }
            }
        }
    }
    console.log(`✅ Successfully injected ${totalInserted} PERFECT Mongoose reviews.`);

    // Clear the sentiment cache so these new reviews get analyzed immediately
    const res = await University.updateMany({}, { $set: { cachedSentiment: {} } });
    console.log(`Cleared cache for ${res.modifiedCount} universities.`);

    process.exit(0);
}

injectMongoose().catch(console.error);
