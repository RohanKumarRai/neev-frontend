// src/context/AuthContext.jsx
//
// ✅ No logic changes — this file was already correct.
//    Only cleanup: removed unused decodeJwt helper (was defined but never called).

import React, { createContext, useState, useContext } from "react";
import api from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(() => {
    const token = localStorage.getItem("token");
    const role  = localStorage.getItem("role");
    const user  = localStorage.getItem("user");

    if (token && role && user) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      return { token, role, user: JSON.parse(user) };
    }
    return { token: null, role: null, user: null };
  });

  const normalizeRole = (role) => {
    if (!role) return null;
    return role.startsWith("ROLE_") ? role : `ROLE_${role}`;
  };

  const login = (token, role, userFromBackend) => {
    const normalizedRole = normalizeRole(role);

    setAuthData({
      token,
      role: normalizedRole,
      user: { ...userFromBackend, role: normalizedRole },
    });

    localStorage.setItem("token", token);
    localStorage.setItem("role", normalizedRole);
    localStorage.setItem("user", JSON.stringify({ ...userFromBackend, role: normalizedRole }));

    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  };

  const logout = () => {
    setAuthData({ token: null, role: null, user: null });
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    delete api.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider
      value={{
        authData,
        user: authData.user,
        role: authData.role,
        token: authData.token,
        isAuthenticated: !!authData.token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
