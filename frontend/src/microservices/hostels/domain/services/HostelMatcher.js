export class HostelMatcher {
  /**
   * Calculate hostel match score based on preferences
   */
  static calculateMatchScore(hostel, preferences) {
    let score = 100;

    // Price scoring (30 points)
    if (preferences.maxPrice) {
      if (hostel.price > preferences.maxPrice) {
        score -= 30;
      } else {
        const priceRatio = hostel.price / preferences.maxPrice;
        score -= priceRatio * 15; // Cheaper is better
      }
    }

    // Distance scoring (25 points)
    if (preferences.maxDistance) {
      if (hostel.distance > preferences.maxDistance) {
        score -= 25;
      } else {
        const distanceRatio = hostel.distance / preferences.maxDistance;
        score -= distanceRatio * 12;
      }
    }

    // Facilities scoring (25 points)
    if (preferences.requiredFacilities && preferences.requiredFacilities.length > 0) {
      const matchedFacilities = preferences.requiredFacilities.filter(f => hostel.facilities.includes(f));
      const facilityScore = matchedFacilities.length / preferences.requiredFacilities.length * 25;
      score -= 25 - facilityScore;
    }

    // Gender match (10 points)
    if (hostel.gender !== "co-ed" && hostel.gender !== preferences.gender) {
      score -= 10;
    }

    // Availability (10 points)
    if (!hostel.available || hostel.occupied >= hostel.capacity) {
      score -= 10;
    }
    return Math.max(0, Math.min(100, score));
  }

  /**
   * Filter hostels by criteria
   */
  static filterHostels(hostels, filters) {
    return hostels.filter(hostel => {
      if (filters.universityId && hostel.universityId !== filters.universityId) return false;
      if (filters.type && hostel.type !== filters.type) return false;
      if (filters.gender && hostel.gender !== "co-ed" && hostel.gender !== filters.gender) return false;
      if (filters.maxPrice && hostel.price > filters.maxPrice) return false;
      if (filters.maxDistance && hostel.distance > filters.maxDistance) return false;
      if (filters.facilities && filters.facilities.length > 0) {
        const hasAllFacilities = filters.facilities.every(f => hostel.facilities.includes(f));
        if (!hasAllFacilities) return false;
      }
      return true;
    });
  }

  /**
   * Sort hostels by distance
   */
  static sortByDistance(hostels) {
    return [...hostels].sort((a, b) => a.distance - b.distance);
  }

  /**
   * Sort hostels by price
   */
  static sortByPrice(hostels) {
    return [...hostels].sort((a, b) => a.price - b.price);
  }

  /**
   * Sort hostels by rating
   */
  static sortByRating(hostels) {
    return [...hostels].sort((a, b) => b.rating - a.rating);
  }

  /**
   * Check if hostel has availability
   */
  static hasAvailability(hostel) {
    return hostel.available && hostel.occupied < hostel.capacity;
  }

  /**
   * Calculate distance from point
   */
  static calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }
}