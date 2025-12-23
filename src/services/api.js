// src/services/api.js

import axios from "axios";

/* ===============================
   🔒 SAFETY GUARD (MANDATORY)
   =============================== */

// ❌ Stop app immediately if API URL is missing
if (!import.meta.env.VITE_API_URL) {
  throw new Error("VITE_API_URL is not defined");
}

// ❌ Warn if someone tries to use localhost (Android will fail)
if (import.meta.env.VITE_API_URL.includes("localhost")) {
  console.error("❌ Android build cannot use localhost as API URL");
}

/* ===============================
   🔹 Backend base URL
   =============================== */
// Example in .env:
// VITE_API_URL=https://your-backend.up.railway.app

const API_BASE_URL = import.meta.env.VITE_API_URL + "/api";

/* ===============================
   🔹 Axios instance
   =============================== */
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/* ===============================
   🔹 Attach JWT token automatically
   =============================== */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* ===============================
   🔹 Global response handler
   =============================== */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized or token expired");
      // optional later:
      // localStorage.removeItem("token");
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
