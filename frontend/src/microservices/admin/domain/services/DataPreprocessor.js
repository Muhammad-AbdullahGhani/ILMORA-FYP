export class DataPreprocessor {
  /**
   * Clean and normalize university data
   */
  static cleanUniversityData(data) {
    return data.map(item => ({
      ...item,
      name: item.name?.trim(),
      location: item.location?.trim(),
      website: item.website?.toLowerCase().trim(),
      fee: {
        min: Math.max(0, item.fee?.min || 0),
        max: Math.max(0, item.fee?.max || 0),
        currency: item.fee?.currency || "PKR"
      }
    })).filter(item => item.name && item.location);
  }

  /**
   * Validate and clean program data
   */
  static cleanProgramData(data) {
    return data.map(item => ({
      ...item,
      name: item.name?.trim(),
      duration: Math.max(1, Math.min(7, item.duration || 4)),
      description: item.description?.trim()
    })).filter(item => item.name);
  }

  /**
   * Normalize career salary data
   */
  static normalizeCareerData(data) {
    return data.map(item => ({
      ...item,
      title: item.title?.trim(),
      salary: {
        min: Math.round(item.salary?.min || 0),
        max: Math.round(item.salary?.max || 0),
        currency: item.salary?.currency || "PKR"
      },
      growth: Math.max(0, Math.min(100, item.growth || 0))
    })).filter(item => item.title);
  }

  /**
   * Aggregate statistics
   */
  static calculateStatistics(data) {
    if (data.length === 0) return {};
    return {
      total: data.length,
      average: data.reduce((sum, item) => sum + (item.value || 0), 0) / data.length,
      min: Math.min(...data.map(item => item.value || 0)),
      max: Math.max(...data.map(item => item.value || 0))
    };
  }

  /**
   * Remove duplicates based on ID
   */
  static removeDuplicates(data) {
    const seen = new Set();
    return data.filter(item => {
      if (seen.has(item.id)) return false;
      seen.add(item.id);
      return true;
    });
  }
}