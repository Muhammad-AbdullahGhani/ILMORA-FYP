export class ScholarshipMatcher {
  /**
   * Calculate scholarship match score based on user profile
   */
  static calculateMatchScore(scholarship, userProfile) {
    let score = 0;

    // Level match (40 points)
    if (scholarship.level === userProfile.level) {
      score += 40;
    }

    // Type-based scoring (30 points)
    if (scholarship.type === "Merit" && userProfile.gpa && userProfile.gpa >= 3.5) {
      score += 30;
    } else if (scholarship.type === "Need-based" && userProfile.financialNeed === "high") {
      score += 30;
    } else if (scholarship.type === "Sports" && userProfile.achievements?.includes("sports")) {
      score += 30;
    }

    // Active deadline (30 points)
    if (scholarship.isActive && new Date(scholarship.deadline) > new Date()) {
      score += 30;
    }
    return Math.min(score, 100);
  }

  /**
   * Filter scholarships by criteria
   */
  static filterScholarships(scholarships, filters) {
    return scholarships.filter(scholarship => {
      if (filters.type && scholarship.type !== filters.type) return false;
      if (filters.level && scholarship.level !== filters.level) return false;
      if (filters.country && scholarship.country !== filters.country) return false;
      if (filters.minAmount && scholarship.amount.min < filters.minAmount) return false;
      return true;
    });
  }

  /**
   * Sort scholarships by deadline
   */
  static sortByDeadline(scholarships) {
    return [...scholarships].sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
  }

  /**
   * Check if scholarship is still available
   */
  static isAvailable(scholarship) {
    return scholarship.isActive && new Date(scholarship.deadline) > new Date();
  }
}