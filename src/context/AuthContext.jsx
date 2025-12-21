import React, { createContext, useState, useEffect, useContext } from "react";
import api from "../services/api"; // Axios instance

// 1. Create the Context object
export const AuthContext = createContext();

// Utility function to decode the JWT payload (optional use)
const decodeJwt = (token) => {
  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(
      atob(payload.replace(/-/g, "+").replace(/_/g, "/"))
    );
    return decoded;
  } catch (e) {
    console.error("Failed to decode JWT:", e);
    return null;
  }
};

// 2. Create the Provider component
export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(() => {
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedRole && storedUser) {
      api.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
      return {
        token: storedToken,
        role: storedRole,
        user: JSON.parse(storedUser)
      };
    }
    return { token: null, role: null, user: null };
  });

  // 3. Login helpers
  const normalizeRole = (role) => {
    if (!role) return null;
    return role.startsWith("ROLE_") ? role : `ROLE_${role}`;
  };

  const login = (token, role, userFromBackend) => {
    const normalizedRole = normalizeRole(role);

    // 🔍 IMPORTANT DEBUG LOG
    console.log("LOGIN NORMALIZED ROLE:", normalizedRole);

    setAuthData({
      token,
      role: normalizedRole,
      user: { ...userFromBackend, role: normalizedRole }
    });

    localStorage.setItem("token", token);
    localStorage.setItem("role", normalizedRole);
    localStorage.setItem(
      "user",
      JSON.stringify({ ...userFromBackend, role: normalizedRole })
    );

    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  };

  // 4. Logout function
  const logout = () => {
    setAuthData({ token: null, role: null, user: null });
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    delete api.defaults.headers.common["Authorization"];
  };

  const isAuthenticated = !!authData.token;

  // Context value
  const contextValue = {
    authData,
    user: authData.user,
    role: authData.role,
    token: authData.token,
    isAuthenticated,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// 5. Custom hook
export const useAuth = () => {
  return useContext(AuthContext);
};
