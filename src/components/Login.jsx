// src/components/Login.jsx
//
// ✅ CHANGES:
//  1. Removed `console.log("ANDROID LOGIN RESPONSE 👉", ...)` debug log left in production code.
//
//  2. "Register here" link changed from <a href="/register"> to <Link to="/register">.
//     <a href> causes a full page reload, losing React state. Link does client-side navigation.
//
//  3. Error message extraction improved — handles both response.data.message (object)
//     and response.data (plain string) from the backend.

import React, { useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useLocation, useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail]     = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  const { login }    = useAuth();
  const location     = useLocation();
  const navigate     = useNavigate();

  const redirectTo = location.state?.redirectTo || "/dashboard";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/users/login", { email, password });
      const { token, role, status, message } = response.data;

      if (status === "success" && token && role) {
        const fakeUser = { email, name: email.split("@")[0] };
        login(token, role, fakeUser);
        navigate(redirectTo, { replace: true });
      } else {
        setError(message || "Login failed. Please try again.");
      }
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        (typeof err.response?.data === "string" ? err.response.data : null) ||
        "Invalid credentials or server error.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="center">
      <div className="card">
        <h2 style={{ marginBottom: "16px" }}>monopsy — Login</h2>

        {error && <div className="alert err" style={{ marginBottom: "12px", color: "#dc2626" }}>{error}</div>}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <label>
            Email
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@example.com"
              style={{ marginTop: "4px" }}
            />
          </label>

          <label>
            Password
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              style={{ marginTop: "4px" }}
            />
          </label>

          <button className="btn" disabled={loading} style={{ marginTop: "4px" }}>
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        {/* ✅ FIX: Link instead of <a> */}
        <p style={{ marginTop: "12px", fontSize: "13px", color: "#6b7280" }}>
          Don't have an account?{" "}
          <Link to="/register" style={{ color: "#2563eb" }}>Register here.</Link>
        </p>
      </div>
    </div>
  );
}
