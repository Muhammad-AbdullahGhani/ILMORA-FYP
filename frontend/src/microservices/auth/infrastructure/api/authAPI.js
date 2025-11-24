// frontend/src/microservices/auth/infrastructure/api/authAPI.js
import { axiosClient } from "@/shared/utils/axiosClient";
export const authAPI = {
  login: credentials => axiosClient.post("/auth/login", credentials),
  register: data => axiosClient.post("/auth/register", data),
  logout: () => axiosClient.post("/auth/logout"),
  refreshToken: () => axiosClient.post("/auth/refresh"),
  updateProfile: updates => axiosClient.put("/auth/profile", updates),
  changePassword: data => axiosClient.post("/auth/change-password", data),
  forgotPassword: email => axiosClient.post("/auth/forgot-password", {
    email
  }),
  resetPassword: data => axiosClient.post("/auth/reset-password", data)
};