import { axiosClient } from "@/shared/utils/axiosClient";
export const hostelAPI = {
  getAll: () => axiosClient.get("/hostels"),
  getById: id => axiosClient.get(`/hostels/${id}`),
  getByUniversity: universityId => axiosClient.get(`/hostels/university/${universityId}`),
  search: filters => axiosClient.post("/hostels/search", filters),
  book: (hostelId, userId) => axiosClient.post("/hostels/book", {
    hostelId,
    userId
  })
};