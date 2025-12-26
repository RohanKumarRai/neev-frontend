
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Header() {
  const { isAuthenticated, authData, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const user = authData?.user;
  const role = authData?.role;

  const userDisplayName =
    user?.name || user?.email?.split("@")[0] || "User";

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/login");
  };

  return (
    <header style={header}>
      <div style={container}>
        {/* LOGO */}
        <Link
  to="/"
  style={logo}
  onClick={() => {
    setOpen(false);      // mobile menu band
    navigate("/");      // force home navigation
  }}
>
  monopsy
</Link>


        {/* DESKTOP NAV */}
        <nav style={desktopNav}>
          {isAuthenticated ? (
            <>
              <span style={userText}>Hi, {userDisplayName}</span>

              <Link to="/dashboard" style={link}>
                Dashboard
              </Link>

              {role === "ROLE_EMPLOYER" && (
                <Link to="/employer/post-job" style={link}>
                  Post Job
                </Link>
              )}

              <button onClick={handleLogout} style={logoutBtn}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                  to="/login"
                  style={loginBtnStyle}
                  onMouseEnter={(e) => {
                    e.target.style.background = "#2563eb";
    e.target.style.color = "#fff";
  }}
  onMouseLeave={(e) => {
    e.target.style.background = "transparent";
    e.target.style.color = "#2563eb";
  }}
>
  Login
</Link>


               <Link
                  to="/Register"
                  style={registerBtn}
                  onMouseEnter={(e) => {
                    e.target.style.background = "#2563eb";
    e.target.style.color = "#fff";
  }}
  onMouseLeave={(e) => {
    e.target.style.background = "transparent";
    e.target.style.color = "#2563eb";
  }}
>
  Register
</Link>
            </>
          )}
        </nav>

        {/* MOBILE MENU BUTTON */}
       <button
  className="menu-btn"
  style={menuBtn}
  onClick={() => setOpen(!open)}
>
  ☰
</button>

      </div>

      {/* MOBILE DROPDOWN */}
      {open && (
        <div style={mobileMenu}>
          {isAuthenticated ? (
            <>
              <span style={mobileUser}>Hi, {userDisplayName}</span>

              <Link to="/dashboard" style={mobileLink} onClick={() => setOpen(false)}>
                Dashboard
              </Link>

              {role === "ROLE_EMPLOYER" && (
                <Link
                  to="/employer/post-job"
                  style={mobileLink}
                  onClick={() => setOpen(false)}
                >
                  Post Job
                </Link>
              )}

              <button onClick={handleLogout} style={mobileLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={mobileLink} onClick={() => setOpen(false)}>
                Login
              </Link>

              <Link to="/register" style={mobileRegister} onClick={() => setOpen(false)}>
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}

const header = {
  position: "sticky",
  top: 0,
  zIndex: 100,
  background: "#ffffff",
  borderBottom: "1px solid #e5e7eb",
  boxShadow: "0 6px 20px rgba(0,0,0,0.06)"
};

const container = {
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "14px 20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between"
};


const logo = {
  fontSize: "26px",
  fontWeight: "800",
  textDecoration: "none",
  background: "linear-gradient(90deg, #2563eb, #4f46e5)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  cursor: "pointer"
  // ❌ margin hata diya
};





const desktopNav = {
  display: "flex",
  alignItems: "center",
  gap: "18px"
};

const link = {
  textDecoration: "none",
  color: "#374151",
  fontSize: "15px"
};
const loginBtnStyle = {
  padding: "8px 18px",
  borderRadius: "10px",
  border: "1.5px solid #2563eb",
  color: "#2563eb",
  background: "transparent",
  fontWeight: "600",
  cursor: "pointer",
  transition: "all 0.25s ease"
};

const registerBtn = {
  padding: "8px 18px",
  borderRadius: "10px",
  border: "1.5px solid #2563eb",
  color: "#2563eb",
  background: "transparent",
  fontWeight: "600",
  cursor: "pointer",
  transition: "all 0.25s ease",
  margin:"5px 1px "
};

const logoutBtn = {
  background: "#ef4444",
  color: "#fff",
  border: "none",
  padding: "8px 14px",
  borderRadius: "8px",
  cursor: "pointer"
};

const userText = {
  fontSize: "14px",
  color: "#6b7280"
};

/* MOBILE */

const menuBtn = {
  fontSize: "26px",
  background: "none",
  border: "none",
  cursor: "pointer"
};



const mobileMenu = {
  position: "absolute",
  right: "16px",
  top: "64px",
  background: "#fff",
  borderRadius: "14px",
  boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
  padding: "14px",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  minWidth: "200px"
};

const mobileLink = {
  textDecoration: "none",
  color: "#111827",
  padding: "8px",
  borderRadius: "8px"
};

const mobileRegister = {
  ...registerBtn,
  textAlign: "center"
};

const mobileLogout = {
  ...logoutBtn
};

const mobileUser = {
  fontSize: "13px",
  color: "#6b7280"
};



