import { axiosClient } from "@/shared/utils/axiosClient";
export const adminAPI = {
  getStats: () => axiosClient.get("/admin/stats"),
  getUsers: (page, limit) => axiosClient.get(`/admin/users?page=${page}&limit=${limit}`),
  updateUser: (userId, updates) => axiosClient.put(`/admin/users/${userId}`, updates),
  deleteUser: userId => axiosClient.delete(`/admin/users/${userId}`),
  bulkImport: (type, data) => axiosClient.post(`/admin/import/${type}`, {
    data
  }),
  exportData: type => axiosClient.get(`/admin/export/${type}`, {
    responseType: "blob"
  }),
  deleteContent: (contentType, id) => axiosClient.delete(`/admin/content/${contentType}/${id}`),
  approveContent: (contentType, id) => axiosClient.post(`/admin/content/${contentType}/${id}/approve`)
};