import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createReadStream } from 'fs';

// Handle __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Simple CSV parser since we're avoiding dependencies
 */
function parseCSV(filePath) {
  return new Promise((resolve, reject) => {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const lines = content.split('\n');
      if (lines.length === 0) {
        resolve([]);
        return;
      }

      const headers = lines[0].split(',').map(h => h.trim());
      const results = [];

      for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue;
        
        const values = lines[i].split(',');
        const obj = {};
        headers.forEach((header, index) => {
          obj[header] = values[index] ? values[index].trim() : '';
        });
        results.push(obj);
      }

      resolve(results);
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Scholarship Mapper Utility
 * Maps scholarships from data files to universities based on eligibility criteria
 */
class ScholarshipMapper {
  constructor() {
    this.scholarships = [];
    this.universities = [];
  }

  /**
   * Load scholarship data from CSV and JSON files
   */
  async loadScholarshipData() {
    try {
      // Load JSON scholarships
      const jsonPath = path.join(__dirname, '../data/scholarships data/eduvision_scholarships.json');
      const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
      this.scholarships = jsonData;

      // Load CSV scholarships (if needed)
      const csvPath = path.join(__dirname, '../data/scholarships data/bachelors_scholarships.csv');
      if (fs.existsSync(csvPath)) {
        const csvScholarships = await this.readCSV(csvPath);
        // Merge CSV scholarships if they have different format
        this.scholarships = [...this.scholarships, ...csvScholarships];
      }

      console.log(`Loaded ${this.scholarships.length} scholarships`);
      return this.scholarships;
    } catch (error) {
      console.error('Error loading scholarship data:', error);
      return [];
    }
  }

  /**
   * Load university data
   */
  loadUniversityData() {
    try {
      const universityPath = path.join(__dirname, '../data/universities data/universities intro details/universities_with_ratio.json');
      this.universities = JSON.parse(fs.readFileSync(universityPath, 'utf8'));
      console.log(`Loaded ${this.universities.length} universities`);
      return this.universities;
    } catch (error) {
      console.error('Error loading university data:', error);
      return [];
    }
  }

  /**
   * Read CSV file and convert to JSON
   */
  async readCSV(filePath) {
    return await parseCSV(filePath);
  }

  /**
   * Extract province/city from university location
   */
  extractLocation(university) {
    const location = university.Location || university.University || '';
    const locationLower = location.toLowerCase();

    // Define major cities and provinces
    const locationMap = {
      'punjab': ['punjab', 'lahore', 'faisalabad', 'rawalpindi', 'multan', 'gujranwala', 'sialkot'],
      'sindh': ['sindh', 'karachi', 'hyderabad', 'sukkur', 'larkana'],
      'balochistan': ['balochistan', 'quetta', 'gwadar', 'khuzdar'],
      'kp': ['khyber', 'peshawar', 'mardan', 'abbottabad', 'swat'],
      'islamabad': ['islamabad', 'ict'],
      'ajk': ['azad kashmir', 'ajk', 'muzaffarabad', 'mirpur'],
      'gilgit': ['gilgit', 'baltistan', 'gb']
    };

    for (const [province, keywords] of Object.entries(locationMap)) {
      if (keywords.some(keyword => locationLower.includes(keyword))) {
        return province;
      }
    }

    return 'unknown';
  }

  /**
   * Check if scholarship is "All Pakistan" type
   */
  isAllPakistanScholarship(scholarship) {
    const area = (scholarship.area || '').toLowerCase();
    return area.includes('all pakistan') || area.includes('pakistan');
  }

  /**
   * Check if scholarship is quota-based (Balochistan/FATA)
   */
  isQuotaScholarship(scholarship) {
    const area = (scholarship.area || '').toLowerCase();
    const title = (scholarship.title || '').toLowerCase();
    const eligibility = (scholarship.eligibility || '').toLowerCase();

    const quotaKeywords = ['balochistan', 'baloch', 'fata', 'ex-fata', 'gilgit', 'gb', 'quota'];
    return quotaKeywords.some(keyword => 
      area.includes(keyword) || title.includes(keyword) || eligibility.includes(keyword)
    );
  }

  /**
   * Check if scholarship is for Bachelor level students
   */
  isBachelorLevelScholarship(scholarship) {
    const level = (scholarship.level || '').toLowerCase();
    
    // Include if level contains "bachelor" or "bs" or "undergraduate"
    return level.includes('bachelor') || 
           level.includes('bs ') || 
           level.includes('undergraduate') ||
           level.includes('bachelors');
  }

  /**
   * Check if scholarship is public/private specific
   */
  getScholarshipUniversityType(scholarship) {
    const title = (scholarship.title || '').toLowerCase();
    const eligibility = (scholarship.eligibility || '').toLowerCase();
    const fullContent = (scholarship.full_content || '').toLowerCase();

    if (fullContent.includes('public universities') || fullContent.includes('public sector universities')) {
      return 'public';
    }
    if (fullContent.includes('private universities') || fullContent.includes('private sector')) {
      return 'private';
    }
    
    return 'both'; // Default: available for both
  }

  /**
   * Map scholarships to a specific university
   */
  mapScholarshipsToUniversity(university) {
    const universityLocation = this.extractLocation(university);
    const universityType = (university.Type || '').toLowerCase();
    const applicableScholarships = [];

    for (const scholarship of this.scholarships) {
      // FILTER: Only include Bachelor level scholarships
      if (!this.isBachelorLevelScholarship(scholarship)) {
        continue; // Skip non-bachelor scholarships
      }

      let isApplicable = false;

      // Rule 1: All Pakistan scholarships apply to all universities
      if (this.isAllPakistanScholarship(scholarship)) {
        isApplicable = true;
      }

      // Rule 2: Quota-based scholarships (Balochistan, FATA, etc.)
      if (this.isQuotaScholarship(scholarship)) {
        const scholarshipArea = (scholarship.area || '').toLowerCase();
        
        // Balochistan scholarships apply to all universities (for Balochistan students)
        if (scholarshipArea.includes('balochistan') || scholarshipArea.includes('baloch')) {
          isApplicable = true;
        }
        
        // FATA scholarships apply to all universities
        if (scholarshipArea.includes('fata')) {
          isApplicable = true;
        }

        // Province-specific: Only apply if university is in that province
        if (scholarshipArea.includes(universityLocation)) {
          isApplicable = true;
        }
      }

      // Rule 3: Public/Private university type matching
      const scholarshipType = this.getScholarshipUniversityType(scholarship);
      if (scholarshipType !== 'both') {
        if (scholarshipType === 'public' && !universityType.includes('public')) {
          isApplicable = false;
        }
        if (scholarshipType === 'private' && !universityType.includes('private')) {
          isApplicable = false;
        }
      }

      // Rule 4: Province/City specific scholarships
      const scholarshipArea = (scholarship.area || '').toLowerCase();
      if (!this.isAllPakistanScholarship(scholarship) && 
          !this.isQuotaScholarship(scholarship) &&
          scholarshipArea !== '') {
        // Check if scholarship area matches university location
        if (scholarshipArea.includes(universityLocation) || 
            universityLocation.includes(scholarshipArea.split(',')[0])) {
          isApplicable = true;
        }
      }

      if (isApplicable) {
        applicableScholarships.push({
          ...scholarship,
          matchReason: this.getMatchReason(scholarship, university, universityLocation)
        });
      }
    }

    return applicableScholarships;
  }

  /**
   * Get the reason why scholarship matches university
   */
  getMatchReason(scholarship, university, universityLocation) {
    const reasons = [];

    if (this.isAllPakistanScholarship(scholarship)) {
      reasons.push('Available for all universities in Pakistan');
    }

    if (this.isQuotaScholarship(scholarship)) {
      const area = (scholarship.area || '').toLowerCase();
      if (area.includes('balochistan')) {
        reasons.push('Special quota for Balochistan students');
      }
      if (area.includes('fata')) {
        reasons.push('Special quota for FATA students');
      }
    }

    const scholarshipType = this.getScholarshipUniversityType(scholarship);
    if (scholarshipType === 'public' && university.Type?.toLowerCase().includes('public')) {
      reasons.push('Available for public universities');
    }
    if (scholarshipType === 'private' && university.Type?.toLowerCase().includes('private')) {
      reasons.push('Available for private universities');
    }

    const scholarshipArea = (scholarship.area || '').toLowerCase();
    if (scholarshipArea.includes(universityLocation)) {
      reasons.push(`Available in ${universityLocation}`);
    }

    return reasons.join('; ');
  }

  /**
   * Get all scholarships for a university by name
   */
  getScholarshipsForUniversity(universityName) {
    const university = this.universities.find(u => 
      u.University?.toLowerCase() === universityName.toLowerCase()
    );

    if (!university) {
      console.warn(`University not found: ${universityName}`);
      return [];
    }

    return this.mapScholarshipsToUniversity(university);
  }

  /**
   * Get all scholarships for all universities (returns a map)
   */
  getAllUniversityScholarshipMappings() {
    const mappings = {};

    for (const university of this.universities) {
      if (university.University) {
        mappings[university.University] = this.mapScholarshipsToUniversity(university);
      }
    }

    return mappings;
  }

  /**
   * Initialize mapper with data
   */
  async initialize() {
    await this.loadScholarshipData();
    this.loadUniversityData();
    console.log('Scholarship Mapper initialized successfully');
  }
}

// Create singleton instance
const scholarshipMapper = new ScholarshipMapper();

export { scholarshipMapper, ScholarshipMapper };
