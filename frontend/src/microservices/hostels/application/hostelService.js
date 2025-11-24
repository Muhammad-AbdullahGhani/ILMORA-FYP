import { HostelMatcher } from "../domain/services/HostelMatcher";
import { hostelAPI } from "../infrastructure/api/hostelAPI";
import { mockHostels } from "../infrastructure/data/mockHostels";
export const hostelService = {
  /**
   * Get all hostels
   */
  async getAll() {
    try {
      const response = await hostelAPI.getAll();
      return response.data;
    } catch (error) {
      console.error("Failed to fetch hostels:", error);
      return mockHostels;
    }
  },
  /**
   * Get hostel by ID
   */
  async getById(id) {
    try {
      const response = await hostelAPI.getById(id);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch hostel:", error);
      return mockHostels.find(h => h.id === id) || null;
    }
  },
  /**
   * Get hostels by university
   */
  async getByUniversity(universityId) {
    try {
      const all = await this.getAll();
      return all.filter(h => h.universityId === universityId);
    } catch (error) {
      console.error("Failed to fetch hostels by university:", error);
      return [];
    }
  },
  /**
   * Search hostels with filters
   */
  async search(filters) {
    try {
      const all = await this.getAll();
      return HostelMatcher.filterHostels(all, filters);
    } catch (error) {
      console.error("Failed to search hostels:", error);
      return [];
    }
  },
  /**
   * Get recommended hostels
   */
  async getRecommendations(universityId, preferences) {
    try {
      const hostels = await this.getByUniversity(universityId);

      // Calculate match scores
      const scored = hostels.map(hostel => ({
        ...hostel,
        matchScore: HostelMatcher.calculateMatchScore(hostel, preferences)
      }));

      // Sort by match score and filter available only
      return scored.filter(h => HostelMatcher.hasAvailability(h)).sort((a, b) => b.matchScore - a.matchScore).slice(0, 10);
    } catch (error) {
      console.error("Failed to get recommendations:", error);
      return [];
    }
  },
  /**
   * Get available hostels
   */
  async getAvailable() {
    try {
      const all = await this.getAll();
      return all.filter(h => HostelMatcher.hasAvailability(h));
    } catch (error) {
      console.error("Failed to get available hostels:", error);
      return [];
    }
  }
};