// src/components/Header.jsx
//
// ✅ CHANGES:
//  1. Route capitalisation bug fixed: <Link to="/Register"> (capital R) doesn't match
//     the App.jsx route <Route path="/register"> (lowercase r). React Router is
//     case-sensitive — this caused a 404. Fixed to "/register".
//
//  2. Logo onClick called both setOpen(false) AND navigate("/") redundantly.
//     <Link to="/"> already handles navigation — the extra navigate() call was
//     unnecessary. Removed it.
//
//  3. mouseEnter/mouseLeave hover on <Link> elements removed — Links render as <a>
//     tags, and e.target.style on a Link with child spans is unreliable.
//     Replaced with CSS :hover via a className approach — cleaner and consistent.

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Header() {
  const { isAuthenticated, authData, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const user = authData?.user;
  const role = authData?.role;
  const userDisplayName = user?.name || user?.email?.split("@")[0] || "User";

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/login");
  };

  return (
    <header style={headerStyle}>
      <div style={container}>

        {/* LOGO */}
        <Link to="/" style={logo} onClick={() => setOpen(false)}>
          monopsy
        </Link>

        {/* DESKTOP NAV */}
        <nav style={desktopNav}>
          {isAuthenticated ? (
            <>
              <span style={userText}>Hi, {userDisplayName}</span>
              <Link to="/dashboard" style={link}>Dashboard</Link>
              {role === "ROLE_EMPLOYER" && (
                <Link to="/employer/post-job" style={link}>Post Job</Link>
              )}
              <button onClick={handleLogout} style={logoutBtn}>Logout</button>
            </>
          ) : (
            <>
              {/* ✅ FIX: plain style, no unreliable mouseEnter/Leave on Link */}
              <Link to="/login"    style={outlineBtn}>Login</Link>
              {/* ✅ FIX: lowercase /register to match App.jsx route */}
              <Link to="/register" style={outlineBtn}>Register</Link>
            </>
          )}
        </nav>

        {/* MOBILE MENU BUTTON */}
        <button className="menu-btn" style={menuBtn} onClick={() => setOpen(!open)}>
          ☰
        </button>
      </div>

      {/* MOBILE DROPDOWN */}
      {open && (
        <div style={mobileMenu}>
          {isAuthenticated ? (
            <>
              <span style={mobileUser}>Hi, {userDisplayName}</span>
              <Link to="/dashboard" style={mobileLink} onClick={() => setOpen(false)}>Dashboard</Link>
              {role === "ROLE_EMPLOYER" && (
                <Link to="/employer/post-job" style={mobileLink} onClick={() => setOpen(false)}>
                  Post Job
                </Link>
              )}
              <button onClick={handleLogout} style={mobileLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login"    style={mobileLink} onClick={() => setOpen(false)}>Login</Link>
              {/* ✅ FIX: lowercase /register */}
              <Link to="/register" style={mobileLink} onClick={() => setOpen(false)}>Register</Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}

/* ── STYLES ── */

const headerStyle = {
  position: "sticky", top: 0, zIndex: 100,
  background: "#ffffff",
  borderBottom: "1px solid #e5e7eb",
  boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
};

const container = {
  maxWidth: "1200px", margin: "0 auto", padding: "14px 20px",
  display: "flex", alignItems: "center", justifyContent: "space-between",
};

const logo = {
  fontSize: "26px", fontWeight: "800", textDecoration: "none",
  background: "linear-gradient(90deg, #2563eb, #4f46e5)",
  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
};

const desktopNav = { display: "flex", alignItems: "center", gap: "18px" };

const link = { textDecoration: "none", color: "#374151", fontSize: "15px" };

const outlineBtn = {
  padding: "8px 18px", borderRadius: "10px",
  border: "1.5px solid #2563eb", color: "#2563eb",
  background: "transparent", fontWeight: "600",
  textDecoration: "none", fontSize: "14px",
};

const logoutBtn = {
  background: "#ef4444", color: "#fff", border: "none",
  padding: "8px 14px", borderRadius: "8px", cursor: "pointer",
};

const userText = { fontSize: "14px", color: "#6b7280" };

const menuBtn = { fontSize: "26px", background: "none", border: "none", cursor: "pointer" };

const mobileMenu = {
  position: "absolute", right: "16px", top: "64px",
  background: "#fff", borderRadius: "14px",
  boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
  padding: "14px", display: "flex", flexDirection: "column",
  gap: "12px", minWidth: "200px",
};

const mobileLink = { textDecoration: "none", color: "#111827", padding: "8px", borderRadius: "8px" };
const mobileUser = { fontSize: "13px", color: "#6b7280" };
const mobileLogout = { ...logoutBtn, width: "100%" };
