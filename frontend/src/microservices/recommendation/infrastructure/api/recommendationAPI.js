import { axiosClient } from "@/shared/utils/axiosClient";
export const recommendationAPI = {
  generate: data => axiosClient.post("/recommendations/generate", data),
  getByUserId: userId => axiosClient.get(`/recommendations/user/${userId}`),
  save: recommendation => axiosClient.post("/recommendations/save", recommendation),
  update: (id, data) => axiosClient.put(`/recommendations/${id}`, data)
};