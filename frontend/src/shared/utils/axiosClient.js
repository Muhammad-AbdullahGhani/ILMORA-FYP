// frontend/src/shared/utils/axiosClient.js
import axios from "axios";

// Vite provides import.meta.env typings by default; no need to redeclare them

export const axiosClient = axios.create({
  // Use Vite proxy during development; fallback to explicit API URL
  baseURL: import.meta.env.VITE_API_URL || "/api",
  headers: {
    "Content-Type": "application/json"
  },
  timeout: 10000
});

// Request interceptor
axiosClient.interceptors.request.use(config => {
  const token = localStorage.getItem("auth_token");
  if (token) {
    if (!config.headers) {
      config.headers = {};
    }
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Response interceptor
axiosClient.interceptors.response.use(response => response, error => {
  if (error.response?.status === 401) {
    // Clear all frontend auth storage keys used by authStorage
    localStorage.removeItem("auth_token");
    localStorage.removeItem("ilm_ora_token");
    localStorage.removeItem("ilm_ora_user");
    window.location.href = "/auth";
  }
  return Promise.reject(error);
});