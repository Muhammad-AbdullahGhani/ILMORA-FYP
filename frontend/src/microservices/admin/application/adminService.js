import { DataPreprocessor } from "../domain/services/DataPreprocessor";
import { adminAPI } from "../infrastructure/api/adminAPI";
export const adminService = {
  /**
   * Get dashboard statistics
   */
  async getStatistics() {
    try {
      const response = await adminAPI.getStats();
      return response.data;
    } catch (error) {
      console.error("Failed to fetch statistics:", error);
      return {
        totalUsers: 0,
        totalUniversities: 0,
        totalPrograms: 0,
        totalReviews: 0
      };
    }
  },
  /**
   * Get all users
   */
  async getUsers(page = 1, limit = 20) {
    try {
      const response = await adminAPI.getUsers(page, limit);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch users:", error);
      return {
        users: [],
        total: 0
      };
    }
  },
  /**
   * Update user
   */
  async updateUser(userId, updates) {
    try {
      const response = await adminAPI.updateUser(userId, updates);
      return response.data;
    } catch (error) {
      console.error("Failed to update user:", error);
      throw new Error("Failed to update user");
    }
  },
  /**
   * Delete user
   */
  async deleteUser(userId) {
    try {
      await adminAPI.deleteUser(userId);
    } catch (error) {
      console.error("Failed to delete user:", error);
      throw new Error("Failed to delete user");
    }
  },
  /**
   * Bulk import universities
   */
  async importUniversities(data) {
    try {
      const cleaned = DataPreprocessor.cleanUniversityData(data);
      const deduped = DataPreprocessor.removeDuplicates(cleaned);
      const response = await adminAPI.bulkImport("universities", deduped);
      return response.data;
    } catch (error) {
      console.error("Failed to import universities:", error);
      throw new Error("Failed to import data");
    }
  },
  /**
   * Export data
   */
  async exportData(type) {
    try {
      const response = await adminAPI.exportData(type);
      return response.data;
    } catch (error) {
      console.error("Failed to export data:", error);
      throw new Error("Failed to export data");
    }
  }
};