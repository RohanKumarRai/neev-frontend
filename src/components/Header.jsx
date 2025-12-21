import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Header() {
  const { isAuthenticated, authData, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const user = authData?.user;
  const role = authData?.role;

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/login");
  };

  const userDisplayName =
    user?.name || user?.email?.split("@")[0] || "User";

  return (
    <header style={headerStyle}>
      {/* Logo */}
      <Link to="/" style={logoStyle}>
        monopsy
      </Link>

      {/* Desktop Nav */}
      <nav style={desktopNavStyle}>
        {isAuthenticated ? (
          <>
            <span style={userStyle}>Hi, {userDisplayName}</span>

            <Link to="/dashboard" style={linkStyle}>
              Dashboard
            </Link>

            {role === "ROLE_EMPLOYER" && (
              <Link to="/create-job" style={linkStyle}>
                Post Job
              </Link>
            )}

            <button onClick={handleLogout} style={buttonStyle}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={linkStyle}>
              Login
            </Link>
            <Link to="/register" style={buttonStyle}>
              Register
            </Link>
          </>
        )}
      </nav>

      {/* Mobile Menu Button */}
      <button
        style={menuButtonStyle}
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>

      {/* Mobile Dropdown */}
      {open && (
        <div style={mobileMenuStyle}>
          {isAuthenticated ? (
            <>
              <span style={mobileUserStyle}>
                Hi, {userDisplayName}
              </span>

              <Link
                to="/dashboard"
                style={mobileLinkStyle}
                onClick={() => setOpen(false)}
              >
                Dashboard
              </Link>

              {role === "ROLE_EMPLOYER" && (
                <Link
                  to="/create-job"
                  style={mobileLinkStyle}
                  onClick={() => setOpen(false)}
                >
                  Post Job
                </Link>
              )}

              <button
                onClick={handleLogout}
                style={mobileButtonStyle}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                style={mobileLinkStyle}
                onClick={() => setOpen(false)}
              >
                Login
              </Link>

              <Link
                to="/register"
                style={mobileButtonStyle}
                onClick={() => setOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}

/* ================= STYLES ================= */

const headerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "10px 16px",
  backgroundColor: "#fff",
  borderBottom: "1px solid #e5e7eb",
  position: "relative",
};

const logoStyle = {
  fontSize: "22px",
  fontWeight: "700",
  color: "#2563eb",
  textDecoration: "none",
};

const desktopNavStyle = {
  display: "flex",
  alignItems: "center",
  gap: "14px",
};

const linkStyle = {
  color: "#1f2937",
  textDecoration: "none",
  padding: "6px 10px",
  borderRadius: "6px",
};

const buttonStyle = {
  padding: "8px 12px",
  borderRadius: "6px",
  border: "none",
  background: "#2563eb",
  color: "#fff",
  cursor: "pointer",
};

const userStyle = {
  fontSize: "14px",
  color: "#6b7280",
};

/* -------- Mobile -------- */

const menuButtonStyle = {
  fontSize: "24px",
  background: "none",
  border: "none",
  cursor: "pointer",
  display: "none",
};

const mobileMenuStyle = {
  position: "absolute",
  top: "60px",
  right: "12px",
  background: "#fff",
  border: "1px solid #e5e7eb",
  borderRadius: "8px",
  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
  padding: "12px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  minWidth: "180px",
  zIndex: 100,
};

const mobileLinkStyle = {
  textDecoration: "none",
  color: "#111827",
  padding: "8px",
  borderRadius: "6px",
};

const mobileButtonStyle = {
  ...buttonStyle,
  width: "100%",
  textAlign: "center",
};

const mobileUserStyle = {
  fontSize: "13px",
  color: "#6b7280",
  marginBottom: "6px",
};

/* ---------- Media Query ---------- */
const styleSheet = document.createElement("style");
styleSheet.innerHTML = `
  @media (max-width: 768px) {
    nav {
      display: none !important;
    }
    button[aria-label="menu"] {
      display: block;
    }
  }
`;
document.head.appendChild(styleSheet);
