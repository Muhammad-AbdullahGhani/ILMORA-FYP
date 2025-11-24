import { axiosClient } from "@/shared/utils/axiosClient";
export const careerAPI = {
  getAll: () => axiosClient.get("/careers"),
  getById: id => axiosClient.get(`/careers/${id}`),
  search: filters => axiosClient.post("/careers/search", filters),
  getTrends: () => axiosClient.get("/careers/trends"),
  getSalaryData: careerId => axiosClient.get(`/careers/${careerId}/salary`)
};