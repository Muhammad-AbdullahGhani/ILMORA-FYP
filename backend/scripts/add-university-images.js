/**
 * Script to add image URLs to university data
 * This script reads the universities JSON and adds image field
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to universities data
const universitiesPath = path.join(__dirname, '../shared/data/universities data/universities intro details/universities_with_ratio.json');

// Image base URL (can be changed to CDN or external source)
const IMAGE_BASE_URL = '/images/universities';

// Function to normalize university name for image filename
function normalizeUniversityName(name) {
  if (!name) return 'default-university';
  
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim();
}

// Function to generate image URL based on university name
function generateImageUrl(universityName) {
  const normalized = normalizeUniversityName(universityName);
  
  // You can customize this logic based on how you name your image files
  return `${IMAGE_BASE_URL}/${normalized}.jpg`;
}

// Main function to update universities data
async function addImagesToUniversities() {
  try {
    // Read existing data
    const data = JSON.parse(fs.readFileSync(universitiesPath, 'utf-8'));
    
    console.log(`Processing ${data.length} universities...`);
    
    // Add image URL to each university
    const updatedData = data.map((university, index) => {
      const imageUrl = generateImageUrl(university.University);
      
      return {
        ...university,
        image: imageUrl,
        // Also add a fallback image URL
        imageFallback: `${IMAGE_BASE_URL}/default-university.svg`
      };
    });
    
    // Save updated data
    const backupPath = universitiesPath.replace('.json', '_backup.json');
    fs.writeFileSync(backupPath, JSON.stringify(data, null, 2));
    console.log(`✅ Backup created at: ${backupPath}`);
    
    fs.writeFileSync(universitiesPath, JSON.stringify(updatedData, null, 2));
    console.log(`✅ Updated ${updatedData.length} universities with image URLs`);
    console.log(`📁 File saved at: ${universitiesPath}`);
    
    // Print sample of updated data
    console.log('\nSample updated entry:');
    console.log(JSON.stringify(updatedData[0], null, 2));
    
  } catch (error) {
    console.error('Error updating universities:', error);
    process.exit(1);
  }
}

// Run the script
addImagesToUniversities();
