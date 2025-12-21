import React, { useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("owner@example.com");
  const [password, setPassword] = useState("OwnerPass1");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ READ REDIRECT INTENT
  const redirectTo = location.state?.redirectTo || "/dashboard";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const loginData = { email, password };

    try {
      const response = await api.post("/users/login", loginData);

      const { token, role, status, message } = response.data;

      // ✅ SUCCESS
      if (status === "success" && token && role) {
        const fakeUser = {
          email,
          name: email.split("@")[0]
        };

        login(token, role, fakeUser);

        // ✅ REDIRECT WITH INTENT
        navigate(redirectTo, { replace: true });

      } else {
        setError(message || "Login failed: No token received.");
      }
    } catch (err) {
      console.error("Login failed:", err);

      let errorMessage =
        "Invalid credentials or network error. Is the backend running?";

      if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="center">
      <div className="card">
        <div className="h1">monopsy — Login</div>

        {error && <div className="alert err">{error}</div>}

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <label>
            Email
            <input
              className="input"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@example.com"
            />
          </label>

          {/* Password */}
          <label>
            Password
            <input
              className="input"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Secure password"
            />
          </label>

          <div style={{ marginTop: 15 }}>
            <button className="btn" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>

        <div style={{ marginTop: 12, fontSize: 13, color: "#6b7280" }}>
          Don't have an account? <a href="/register">Register here.</a>
        </div>
      </div>
    </div>
  );
}
