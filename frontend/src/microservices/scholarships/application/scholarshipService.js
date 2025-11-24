import { ScholarshipMatcher } from "../domain/services/ScholarshipMatcher";
import { scholarshipAPI } from "../infrastructure/api/scholarshipAPI";
import { mockScholarships } from "../infrastructure/data/mockScholarships";
export const scholarshipService = {
  /**
   * Get all scholarships
   */
  async getAll() {
    try {
      const response = await scholarshipAPI.getAll();
      return response.data;
    } catch (error) {
      console.error("Failed to fetch scholarships:", error);
      return mockScholarships;
    }
  },
  /**
   * Get scholarship by ID
   */
  async getById(id) {
    try {
      const response = await scholarshipAPI.getById(id);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch scholarship:", error);
      return mockScholarships.find(s => s.id === id) || null;
    }
  },
  /**
   * Search scholarships with filters
   */
  async search(filters) {
    try {
      const all = await this.getAll();
      return ScholarshipMatcher.filterScholarships(all, filters);
    } catch (error) {
      console.error("Failed to search scholarships:", error);
      return [];
    }
  },
  /**
   * Get recommended scholarships for user
   */
  async getRecommendations(userProfile) {
    try {
      const all = await this.getAll();

      // Calculate match scores
      const scored = all.map(scholarship => ({
        ...scholarship,
        matchScore: ScholarshipMatcher.calculateMatchScore(scholarship, userProfile)
      }));

      // Sort by match score and filter available only
      return scored.filter(s => ScholarshipMatcher.isAvailable(s)).sort((a, b) => b.matchScore - a.matchScore).slice(0, 10);
    } catch (error) {
      console.error("Failed to get recommendations:", error);
      return [];
    }
  },
  /**
   * Get upcoming deadlines
   */
  async getUpcomingDeadlines() {
    try {
      const all = await this.getAll();
      const available = all.filter(s => ScholarshipMatcher.isAvailable(s));
      return ScholarshipMatcher.sortByDeadline(available).slice(0, 5);
    } catch (error) {
      console.error("Failed to get upcoming deadlines:", error);
      return [];
    }
  }
};