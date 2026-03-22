// src/components/UserList.jsx
//
// ✅ CHANGES:
//  1. Role guard added — only ROLE_ADMIN users should see this page.
//     Backend now returns 403 for non-admins, but we also guard on the frontend
//     so non-admins don't even see the loading state.
//
//  2. Password column removed from the table. Even though the backend now sends
//     @JsonIgnore on password, we shouldn't even have a column for it — it
//     normalises the expectation that password is never a display field.

import React, { useState, useEffect } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext.jsx";

export default function UserList() {
  const [users, setUsers]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState("");

  const { role } = useAuth();

  // Guard: only admins should access this
  if (role !== "ROLE_ADMIN") {
    return (
      <div className="center">
        <div className="card">
          <p style={{ color: "#dc2626" }}>⛔ Access denied. Admins only.</p>
        </div>
      </div>
    );
  }

  useEffect(() => {
    api.get("/users/all")
      .then((res) => setUsers(res.data))
      .catch(() => setError("Failed to load users. Check permissions."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="center">Loading users...</div>;
  if (error)   return <div className="center"><p style={{ color: "#dc2626" }}>{error}</p></div>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Registered Users ({users.length})</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>ID</th>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td style={tdStyle}>{u.id}</td>
              <td style={tdStyle}>{u.name}</td>
              <td style={tdStyle}>{u.email}</td>
              <td style={tdStyle}>{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const tableStyle = { width: "100%", borderCollapse: "collapse", marginTop: "15px" };
const thStyle    = { border: "1px solid #ddd", padding: "8px", background: "#f2f2f2", textAlign: "left" };
const tdStyle    = { border: "1px solid #ddd", padding: "8px" };
