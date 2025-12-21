import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api'; // Assuming your Axios instance is here

// 1. Create the Context object
export const AuthContext = createContext();

// Utility function to decode the JWT payload (for extracting user info)
// NOTE: This is a simplification; in a real app, use a proper JWT library.
const decodeJwt = (token) => {
    try {
        const payload = token.split('.')[1];
        // Decode base64 URL-safe string
        const decoded = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
        return decoded;
    } catch (e) {
        console.error("Failed to decode JWT:", e);
        return null;
    }
};

// 2. Create the Provider component
export const AuthProvider = ({ children }) => {
    // State to hold the authentication data
    const [authData, setAuthData] = useState(() => {
        // Load stored data from localStorage on initial load
        const storedToken = localStorage.getItem('token');
        const storedRole = localStorage.getItem('role');
        const storedUser = localStorage.getItem('user');

        if (storedToken && storedRole && storedUser) {
            // Set the Authorization header globally
            api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
            return {
                token: storedToken,
                role: storedRole,
                user: JSON.parse(storedUser)
            };
        }
        return { token: null, role: null, user: null };
    });

    // 3. Login function
   const login = (token, role, userFromBackend) => {
    setAuthData({
        token,
        role,
        user: userFromBackend   // ✅ REAL user object now
    });

    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    localStorage.setItem('user', JSON.stringify(userFromBackend));

    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};


    // 4. Logout function
    const logout = () => {
        // Clear state and localStorage
        setAuthData({ token: null, role: null, user: null });
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('user');
        
        // Remove the Authorization header
        delete api.defaults.headers.common['Authorization'];
    };

    const isAuthenticated = !!authData.token;
    
    // The value object passed down to consuming components
   const contextValue = {
  authData,
  user: authData.user,
  role: authData.role,
  token: authData.token,
  isAuthenticated,
  login,
  logout,
};


    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

// 5. Custom hook for easier access
export const useAuth = () => {
    return useContext(AuthContext);
};