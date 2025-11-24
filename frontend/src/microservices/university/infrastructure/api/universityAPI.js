import { axiosClient } from "@/shared/utils/axiosClient";
export const universityAPI = {
  getAll: () => axiosClient.get("/universities"),
  getById: id => axiosClient.get(`/universities/${id}`),
  search: filters => axiosClient.post("/universities/search", filters),
  getPrograms: universityId => axiosClient.get(`/universities/${universityId}/programs`),
  compare: ids => axiosClient.post("/universities/compare", {
    ids
  })
};