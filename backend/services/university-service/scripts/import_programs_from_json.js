import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { University } from '../src/models/University.js';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Use the same URI as the main application
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://abdullahghani:1234@cluster0.ehehitv.mongodb.net/university-reviews?retryWrites=true&w=majority";

// Path to the JSON data files
const PROGRAMS_DATA_DIR = path.join(__dirname, '../../../shared/data/universities data/universities programs details');

// Automatically detect all JSON files in the directory (excluding notebooks)
const getAllJSONFiles = () => {
    try {
        return fs.readdirSync(PROGRAMS_DATA_DIR)
            .filter(file => file.endsWith('.json') && !file.includes('Universities names'));
    } catch (error) {
        console.error('Error reading programs directory:', error);
        return [];
    }
};

const programFiles = getAllJSONFiles();

async function importProgramsFromJSON() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB.\n');

        let totalUniversities = 0;
        let totalPrograms = 0;
        let notFoundCount = 0;
        const notFoundUniversities = [];

        for (const filename of programFiles) {
            const filePath = path.join(PROGRAMS_DATA_DIR, filename);
            
            if (!fs.existsSync(filePath)) {
                console.log(`⚠️  File not found: ${filename}`);
                continue;
            }

            console.log(`📄 Processing ${filename}...`);
            const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

            for (const uniData of data) {
                const uniName = uniData.name;
                if (!uniName) continue;

                // Try to find university in database
                // First try exact match
                let university = await University.findOne({ name: uniName });

                // If not found, try case-insensitive match
                if (!university) {
                    university = await University.findOne({ 
                        name: { $regex: new RegExp(`^${uniName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i') }
                    });
                }

                // If still not found, try matching the first part (before comma)
                if (!university && uniName.includes(',')) {
                    const shortName = uniName.split(',')[0].trim();
                    university = await University.findOne({ 
                        name: { $regex: new RegExp(`^${shortName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'i') }
                    });
                }

                if (!university) {
                    console.log(`❌ University not found in DB: ${uniName}`);
                    notFoundCount++;
                    notFoundUniversities.push(uniName);
                    continue;
                }

                // Map bachelors_programs to the University schema
                const programs = (uniData.bachelors_programs || []).map(prog => ({
                    name: prog.program_name,
                    duration: prog.duration,
                    feePerSemester: prog.fee_per_sem === 'NA' ? null : prog.fee_per_sem,
                    meritDeadline: prog.merit_deadline,
                    detailUrl: uniData.detail_url,
                    phone: uniData.phone
                }));

                if (programs.length > 0) {
                    // Replace existing programs or add new ones
                    university.programs = programs;
                    university.lastUpdated = new Date();
                    await university.save();
                    
                    console.log(`✅ Updated ${university.name} with ${programs.length} programs`);
                    totalUniversities++;
                    totalPrograms += programs.length;
                } else {
                    console.log(`⚠️  No programs found for ${uniName}`);
                }
            }
            
            console.log('');
        }

        console.log('\n📊 Import Summary:');
        console.log(`✅ Universities updated: ${totalUniversities}`);
        console.log(`✅ Total programs imported: ${totalPrograms}`);
        console.log(`❌ Universities not found: ${notFoundCount}`);

        if (notFoundUniversities.length > 0) {
            console.log('\n📋 Universities not found in database:');
            notFoundUniversities.forEach(name => console.log(`   - ${name}`));
            console.log('\n💡 Tip: These universities need to be added to the database first.');
            console.log('   You can use the universities_with_ratio.json file to import them.');
        }

        console.log('\n✨ Import completed!');
        process.exit(0);

    } catch (error) {
        console.error('❌ Import failed:', error);
        process.exit(1);
    }
}

importProgramsFromJSON();
