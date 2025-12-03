import { axiosClient } from "@/shared/utils/axiosClient";

export const recommendationAPI = {
  /**
   * Calls the Python AI Service to get degree matches.
   * Payload: { R, I, A, S, E, C, background: { level, group } }
   */
  generate: (data) => axiosClient.post("/recommend/degrees", data),

  // These endpoints are not yet implemented in the Python backend.
  // You might need a separate 'user-service' or database for saving results.
  // For now, I'll leave them as they might point to a different microservice.
  getByUserId: (userId) => axiosClient.get(`/recommendations/user/${userId}`),
  save: (recommendation) => axiosClient.post("/recommendations/save", recommendation),
  update: (id, data) => axiosClient.put(`/recommendations/${id}`, data)
};