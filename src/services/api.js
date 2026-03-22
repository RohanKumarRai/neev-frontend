// src/services/api.js

// ✅ CHANGES:
//  1. Removed the hard `throw new Error` on missing VITE_API_URL.
//     That crashed the entire app at startup in dev if .env wasn't set yet.
//     Now it warns and falls back to localhost so development still works.
//
//  2. Removed the hard console.error on localhost — that's valid in dev.
//
//  3. On 401, token + user are now cleared automatically and user is sent to /login.
//     Previously it only logged a warning and left stale auth data in localStorage.
//
//  4. Create a .env file in your project root with:
//       VITE_API_URL=http://localhost:8080
//     For production Vercel deployment set:
//       VITE_API_URL=https://your-backend.up.railway.app

import axios from "axios";

const rawBase = import.meta.env.VITE_API_URL;

if (!rawBase) {
  console.warn(
    "⚠️  VITE_API_URL is not set in .env — falling back to http://localhost:8080"
  );
}

const API_BASE_URL = (rawBase || "http://localhost:8080") + "/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Attach JWT to every request automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Global response error handler
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // ✅ FIX: clear stale auth and redirect to login
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("user");
      delete api.defaults.headers.common["Authorization"];
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
