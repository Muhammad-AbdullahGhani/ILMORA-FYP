import { axiosClient } from "@/shared/utils/axiosClient";

export const recommendationAPI = {
  /**
   * Calls the Python AI Service to get degree matches.
   * Payload: { R, I, A, S, E, C, background: { level, group } }
   * Note: Uses extended timeout for ML model predictions
   */
  generate: (data) => axiosClient.post("/recommend/degrees", data, {
    timeout: 60000 // 60 seconds for ML model predictions
  })
};