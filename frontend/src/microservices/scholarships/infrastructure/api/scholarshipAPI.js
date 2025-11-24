import { axiosClient } from "@/shared/utils/axiosClient";
export const scholarshipAPI = {
  getAll: () => axiosClient.get("/scholarships"),
  getById: id => axiosClient.get(`/scholarships/${id}`),
  search: filters => axiosClient.post("/scholarships/search", filters),
  apply: (scholarshipId, userId) => axiosClient.post("/scholarships/apply", {
    scholarshipId,
    userId
  })
};