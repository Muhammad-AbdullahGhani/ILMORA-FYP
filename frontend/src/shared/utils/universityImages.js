/**
 * University Image Mapping Utility
 * Maps university names to their respective images
 */

// Import images from assets
import airUniversity from '../../assets/images/universities/Air University.jpg';
import airH11 from '../../assets/images/universities/Air-H11.jpg';
import alKaram from '../../assets/images/universities/Al Karam.jpg';
import alKhair from '../../assets/images/universities/Al Khair.jpg';
import aiou from '../../assets/images/universities/Allama Iqbal Uni.jpg';
import abasyn from '../../assets/images/universities/Abasyn.png';
import bahriaE8 from '../../assets/images/universities/Bahria.jpg';
import bahriaH11 from '../../assets/images/universities/Bahria-H11.jpg';
import bnu from '../../assets/images/universities/BNU.jpg';
import comsats from '../../assets/images/universities/Comsats.jpg';
import cust from '../../assets/images/universities/CUST.jpg';
import fast from '../../assets/images/universities/FAST.jpg';
import fjwu from '../../assets/images/universities/FJW.jpg';
import foundation from '../../assets/images/universities/foundation.png';
import fuuast from '../../assets/images/universities/FUUAST.jpg';
import giki from '../../assets/images/universities/GIKI.jpg';
import iiui from '../../assets/images/universities/IIUI.jpg';
import ist from '../../assets/images/universities/IST.jpg';
import miu from '../../assets/images/universities/MIU.jpg';
import ndu from '../../assets/images/universities/NDU.jpg';
import northern from '../../assets/images/universities/Northern.jpg';
import nsu from '../../assets/images/universities/NSU.jpg';
import numl from '../../assets/images/universities/NUML.jpg';
import nust from '../../assets/images/universities/NUST.jpg';
import nutech from '../../assets/images/universities/NUTECH.jpg';
import pide from '../../assets/images/universities/PIDE.jpg';
import pieas from '../../assets/images/universities/PIEAS.jpg';
import qau from '../../assets/images/universities/QAU.jpg';
import riphah from '../../assets/images/universities/Ripha.jpg';
import rmu from '../../assets/images/universities/RMU.jpg';
import sirSyed from '../../assets/images/universities/Sir Syed Case Uni.jpg';
import stmu from '../../assets/images/universities/STMU.jpg';
import szabist from '../../assets/images/universities/SZABIST.jpg';
import szabmu from '../../assets/images/universities/SZABMU.jpg';
import apcoms from '../../assets/images/universities/apcoms.jpg';

/**
 * Image mapping object
 * Key: University apiName or name (normalized)
 * Value: Imported image
 */
export const universityImages = {
  // Air University
  'Air University': airUniversity,
  'air university': airUniversity,
  'air-university': airUniversity,
  
  // Air University H-11 Campus
  'Air University, H-11 Campus, Islamabad': airH11,
  'air-h11': airH11,
  
  // Al-Karam International University
  'Al-karam International University, Islamabad': alKaram,
  'al-karam': alKaram,
  
  // Al-Khair University
  'Al-khair University [ajk], Islamabad': alKhair,
  'al-khair': alKhair,
  
  // Allama Iqbal Open University
  'Allama Iqbal Open University, Islamabad': aiou,
  'aiou': aiou,
  'allama-iqbal': aiou,
  
  // Abasyn University
  'Abasyn University (sub Campus), Islamabad': abasyn,
  'abasyn': abasyn,
  
  // Bahria University E-8
  'Bahria University, E-8 Campus, Islamabad': bahriaE8,
  'bahria-e8': bahriaE8,
  'bahria-university': bahriaE8,
  
  // Bahria University H-11
  'Bahria University, H-11 Campus, Islamabad': bahriaH11,
  'bahria-h11': bahriaH11,
  
  // Beaconhouse National University
  'BNU - Beaconhouse National University': bnu,
  'bnu': bnu,
  'beaconhouse': bnu,
  
  // COMSATS
  'COMSATS': comsats,
  'Comsats University Islamabad, Islamabad': comsats,
  'comsats': comsats,
  
  // CUST
  'CUST': cust,
  'Capital University Of Science And Technology, Islamabad': cust,
  'cust': cust,
  
  // FAST-NUCES
  'FAST-NUCES': fast,
  'National University Of Computer And Emerging Sciences, Islamabad, Islamabad': fast,
  'fast': fast,
  'fast-nuces': fast,
  
  // Fatima Jinnah Women University
  'Fatima Jinnah Women University (Rawalpindi)': fjwu,
  'fjwu': fjwu,
  'fatima-jinnah': fjwu,
  
  // Foundation University
  'Foundation University Islamabad': foundation,
  'Foundation University, Islamabad': foundation,
  'foundation': foundation,
  
  // FUUAST
  'Federal Urdu University Of Arts Science & Technology Islamabad, Islamabad': fuuast,
  'fuuast': fuuast,
  
  // GIKI
  'GIKI (commuter students)': giki,
  'giki': giki,
  'ghulam-ishaq-khan': giki,
  
  // International Islamic University
  'International Islamic University, Islamabad': iiui,
  'iiui': iiui,
  'international-islamic': iiui,
  
  // Institute of Space Technology
  'Institute Of Space Technology, Islamabad': ist,
  'ist': ist,
  
  // Mohiuddin Islamic University
  'Mohiuddin Islamic University[islamabad Campus], Islamabad': miu,
  'miu': miu,
  
  // National Defence University
  'National Defence University, Islamabad': ndu,
  'ndu': ndu,
  
  // Northern University
  'Northern University, Islamabad': northern,
  'northern': northern,
  
  // National Skills University
  'National Skills University, Islamabad': nsu,
  'nsu': nsu,
  
  // NUML
  'NUML': numl,
  'National University Of Modern Languages, Islamabad, Islamabad': numl,
  'numl': numl,
  
  // NUST
  'NUST': nust,
  'National University Of Science & Technology, Islamabad': nust,
  'nust': nust,
  
  // NUTECH
  'National University Of Technology, Islamabad': nutech,
  'nutech': nutech,
  
  // PIDE
  'Pakistan Institute Of Development Economics, Islamabad': pide,
  'pide': pide,
  
  // PIEAS
  'Pakistan Institute of Engineering and Applied Sciences (PIEAS)': pieas,
  'Pakistan Institute Of Engineering & Applied Sciences, Islamabad': pieas,
  'pieas': pieas,
  
  // Quaid-i-Azam University
  'Quaid-i-Azam University': qau,
  'Quaid-e-azam University, Islamabad': qau,
  'qau': qau,
  'quaid-i-azam': qau,
  
  // Riphah International University
  'Riphah International University': riphah,
  'Riphah International University, Islamabad': riphah,
  'Riphah Rawalpindi Campus': riphah,
  'riphah': riphah,
  
  // Rawalpindi Medical University
  'Rawalpindi Medical University': rmu,
  'rmu': rmu,
  
  // Sir Syed Case Institute
  'Sir Syed Case Institute Of Technology, Islamabad': sirSyed,
  'sir-syed': sirSyed,
  
  // Shifa Tameer-e-Millat University
  'Shifa Tameer-e-millat University, Islamabad': stmu,
  'stmu': stmu,
  'shifa': stmu,
  
  // SZABIST
  'SZABIST Islamabad': szabist,
  'szabist': szabist,
  
  // Shaheed Zulfiqar Ali Bhutto Medical University
  'Shaheed Zulfiqar Ali Bhutto Medical University, Pims, Islamabad': szabmu,
  'szabmu': szabmu,
  
  // APCOMS
  'APCOMS': apcoms,
  'Army Public College of Management and Sciences (APCOMS)': apcoms,
  'apcoms': apcoms,
};

/**
 * Get university image
 * @param {string} nameOrApiName - The university name or apiName
 * @param {string} fallbackUrl - Optional fallback URL
 * @returns {string|object} Image URL or imported image
 */
export const getUniversityImage = (nameOrApiName, fallbackUrl = null) => {
  if (!nameOrApiName) return fallbackUrl || null;
  
  // Try exact match first
  if (universityImages[nameOrApiName]) {
    return universityImages[nameOrApiName];
  }
  
  // Try lowercase match
  const lowerName = nameOrApiName.toLowerCase().trim();
  if (universityImages[lowerName]) {
    return universityImages[lowerName];
  }
  
  // Try normalized match (remove special characters, replace spaces with hyphens)
  const normalized = nameOrApiName
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .trim();
  
  if (universityImages[normalized]) {
    return universityImages[normalized];
  }
  
  // Return fallback
  return fallbackUrl || null;
};

/**
 * Check if university has a custom image
 * @param {string} apiName - The normalized university name
 * @returns {boolean} True if custom image exists
 */
export const hasUniversityImage = (apiName) => {
  if (!apiName) return false;
  const normalizedName = apiName.toLowerCase().trim();
  return normalizedName in universityImages;
};

/**
 * Get university logo/image from external source (Wikipedia, official website, etc.)
 * This can be used as a fallback or primary source
 */
export const getExternalUniversityImage = (universityName) => {
  // Option: Use a service like Clearbit, Google Custom Search API, or scrape Wikipedia
  // For now, return a placeholder that could be replaced with actual API calls
  const encodedName = encodeURIComponent(universityName);
  
  // Example using a generic education placeholder service
  return `https://ui-avatars.com/api/?name=${encodedName}&size=400&background=random&bold=true`;
};

export default {
  universityImages,
  getUniversityImage,
  hasUniversityImage,
  getExternalUniversityImage
};
