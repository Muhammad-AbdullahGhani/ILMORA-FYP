import { axiosClient } from "@/shared/utils/axiosClient";
export const sentimentAPI = {
  getByUniversity: universityId => axiosClient.get(`/sentiment/university/${universityId}`),
  getReviews: universityId => axiosClient.get(`/sentiment/reviews/${universityId}`),
  addReview: data => axiosClient.post("/sentiment/review", data),
  analyzeSentiment: text => axiosClient.post("/sentiment/analyze", {
    text
  }),
  getTrends: universityId => axiosClient.get(`/sentiment/trends/${universityId}`)
};