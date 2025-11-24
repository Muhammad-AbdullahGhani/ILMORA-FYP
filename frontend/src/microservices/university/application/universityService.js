import { universityAPI } from "../infrastructure/api/universityAPI";
import { mockUniversities } from "../infrastructure/data/mockUniversities";
export const universityService = {
  /**
   * Get all universities
   */
  async getAll() {
    try {
      const response = await universityAPI.getAll();
      return response.data;
    } catch (error) {
      console.error("Failed to fetch universities:", error);
      return mockUniversities;
    }
  },
  /**
   * Get university by ID
   */
  async getById(id) {
    try {
      const response = await universityAPI.getById(id);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch university:", error);
      return mockUniversities.find(u => u.id === id) || null;
    }
  },
  /**
   * Search universities
   */
  async search(filters) {
    try {
      const all = await this.getAll();
      return all.filter(uni => {
        if (filters.city && uni.city !== filters.city) return false;
        if (filters.type && uni.type !== filters.type) return false;
        if (filters.maxFee && uni.fee.max > filters.maxFee) return false;
        if (filters.programs && filters.programs.length > 0) {
          const hasProgram = filters.programs.some(p => uni.programs.includes(p));
          if (!hasProgram) return false;
        }
        return true;
      });
    } catch (error) {
      console.error("Failed to search universities:", error);
      return [];
    }
  },
  /**
   * Get top universities
   */
  async getTopUniversities(limit = 10) {
    try {
      const all = await this.getAll();
      return all.sort((a, b) => a.ranking - b.ranking).slice(0, limit);
    } catch (error) {
      console.error("Failed to fetch top universities:", error);
      return [];
    }
  },
  /**
   * Get universities by city
   */
  async getByCity(city) {
    try {
      const all = await this.getAll();
      return all.filter(u => u.city === city);
    } catch (error) {
      console.error("Failed to fetch universities by city:", error);
      return [];
    }
  }
};