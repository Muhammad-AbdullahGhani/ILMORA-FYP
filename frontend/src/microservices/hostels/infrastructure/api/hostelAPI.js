import { axiosClient } from "@/shared/utils/axiosClient";
export const hostelAPI = {
  getNearbyByUniversity: (universityId, params = {}) => axiosClient.get(`/hostels/near/${encodeURIComponent(universityId)}`, {
    params
  }),
  getUniversities: () => axiosClient.get("/universities", {
    params: { limit: 100, page: 1 }
  })
};