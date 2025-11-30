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

// Helper to parse CSV line handling quotes
function parseCSVLine(text) {
    const result = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            result.push(current.trim());
            current = '';
        } else {
            current += char;
        }
    }
    result.push(current.trim());
    return result;
}

async function importData() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('Connected.');

        const universitiesFile = path.join(__dirname, '../data/universities_with_ratio.csv');
        const programsFile = path.join(__dirname, '../data/universities_islamabad_bachelors1.csv');

        // 1. Import Universities
        console.log('Reading universities file...');
        const uniContent = fs.readFileSync(universitiesFile, 'utf-8');
        const uniLines = uniContent.split('\n').filter(line => line.trim());
        const uniHeaders = parseCSVLine(uniLines[0]);

        // Map headers to indices
        const h = {};
        uniHeaders.forEach((header, index) => {
            h[header.trim()] = index;
        });

        console.log('Found headers:', Object.keys(h));

        // Helper to clean numbers
        const cleanNum = (val) => {
            if (!val) return 0;
            const num = parseInt(val.replace(/,/g, ''));
            return isNaN(num) ? 0 : num;
        };

        for (let i = 1; i < uniLines.length; i++) {
            const cols = parseCSVLine(uniLines[i]);
            if (cols.length < 2) continue;

            const name = cols[h['University']]?.replace(/^"|"$/g, '');
            if (!name) continue;

            const universityData = {
                name: name,
                wikipediaUrl: cols[h['Wikipedia_URL']],
                type: cols[h['Type']],
                established: cols[h['Established']],
                affiliation: cols[h['Affiliation']],
                viceChancellor: cols[h['Vice-Chancellor']],
                principal: cols[h['Principal']],
                dean: cols[h['Dean']],
                director: cols[h['Director']],
                academicStaff: cleanNum(cols[h['Academic Staff']]),
                adminStaff: cleanNum(cols[h['Administrative Staff']]),
                totalStudents: cleanNum(cols[h['Students']]) || cleanNum(cols[h['Total_Students']]),
                undergradStudents: cleanNum(cols[h['Undergrad']]),
                postgradStudents: cleanNum(cols[h['Postgrad']]),
                location: cols[h['Location']] || 'Islamabad',
                campus: cols[h['Campus']],
                website: cols[h['Website']],
                totalStaff: cleanNum(cols[h['Total_Staff']]),
                studentStaffRatio: cols[h['Student_Staff_Ratio']],
                malePercentage: cols[h['Male']],
                femalePercentage: cols[h['Female']],
                programs: [] // Initialize empty programs array
            };

            try {
                await University.findOneAndUpdate(
                    { name: universityData.name },
                    universityData,
                    { upsert: true, new: true, runValidators: true }
                );
                console.log(`Processed university: ${name}`);
            } catch (err) {
                console.error(`Failed to save university ${name}:`, err.message);
            }
        }

        // 2. Import Programs
        console.log('Reading programs file...');
        const progContent = fs.readFileSync(programsFile, 'utf-8');
        const progLines = progContent.split('\n').filter(line => line.trim());
        const progHeaders = parseCSVLine(progLines[0]);

        const p = {};
        progHeaders.forEach((header, index) => {
            p[header.trim()] = index;
        });

        for (let i = 1; i < progLines.length; i++) {
            const cols = parseCSVLine(progLines[i]);
            if (cols.length < 2) continue;

            const uniName = cols[p['University Name']]?.replace(/^"|"$/g, '');
            const progName = cols[p['Program Name']];

            if (!uniName || !progName) {
                continue;
            }

            const program = {
                name: progName,
                detailUrl: cols[p['Detail URL']],
                phone: cols[p['Phone']],
                duration: cols[p['Duration']],
                feePerSemester: cols[p['Fee/Sem']],
                meritDeadline: cols[p['Merit Deadline']]
            };

            // Find university and add program
            // Note: We use a regex to match university names loosely as CSVs might have slight variations
            const uni = await University.findOne({
                name: new RegExp(uniName.split(',')[0], 'i')
            });

            if (uni) {
                uni.programs.push(program);
                await uni.save();
                // console.log(`Added program ${program.name} to ${uni.name}`);
            } else {
                console.warn(`University not found for program: ${uniName}`);
            }
        }

        console.log('Import completed successfully.');
        process.exit(0);

    } catch (error) {
        console.error('Import failed:', error);
        process.exit(1);
    }
}

importData();
