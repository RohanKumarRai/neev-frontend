// src/components/Register.jsx
//
// ✅ CHANGES:
//  1. Double ROLE_ prefix bug fixed.
//     The form sends role = "WORKER" or "EMPLOYER" (from the dropdown).
//     The old code then did: role: 'ROLE_' + role.toUpperCase()
//     which produces "ROLE_WORKER" — correct.
//     BUT if someone ever set the dropdown value to "ROLE_WORKER" directly
//     it would produce "ROLE_ROLE_WORKER". Fixed with a proper normalise check.
//
//  2. "Sign in here" changed from <a href="/login"> to <Link to="/login">
//     to avoid full page reload.
//
//  3. Consistent form gap styling added (same as Login).

import React, { useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole]         = useState("WORKER");
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");
  const [success, setSuccess]   = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    // ✅ FIX: normalise safely — never double-prefix
    const normalizedRole = role.startsWith("ROLE_") ? role : `ROLE_${role.toUpperCase()}`;

    const userData = { name, email, password, role: normalizedRole };

    try {
      const response = await api.post("/users", userData);
      setSuccess(`Account created for ${response.data.name || email}! Redirecting to login...`);
      setName(""); setEmail(""); setPassword("");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        (typeof err.response?.data === "string" ? err.response.data : null) ||
        "Registration failed. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="center">
      <div className="card">
        <h2 style={{ marginBottom: "16px" }}>monopsy — Register</h2>

        {error   && <div style={{ color: "#dc2626", marginBottom: "12px", fontSize: "14px" }}>⚠ {error}</div>}
        {success && <div style={{ color: "#16a34a", marginBottom: "12px", fontSize: "14px" }}>✅ {success}</div>}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>

          <label>
            I am registering as:
            <select value={role} onChange={(e) => setRole(e.target.value)} style={{ marginTop: "4px" }}>
              <option value="WORKER">Worker (Looking for jobs)</option>
              <option value="EMPLOYER">Employer (Posting jobs)</option>
            </select>
          </label>

          <label>
            Full Name
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              style={{ marginTop: "4px" }}
            />
          </label>

          <label>
            Email
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
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
              placeholder="Secure password"
              style={{ marginTop: "4px" }}
            />
          </label>

          <button className="btn" disabled={loading} style={{ marginTop: "4px" }}>
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        {/* ✅ FIX: Link instead of <a> */}
        <p style={{ marginTop: "12px", fontSize: "13px", color: "#6b7280" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#2563eb" }}>Sign in here.</Link>
        </p>
      </div>
    </div>
  );
}
