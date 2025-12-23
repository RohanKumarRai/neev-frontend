/*import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Footer() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // 🔹 SINGLE HELPER — SOLVES EVERYTHING (WITH LOGS)
  function handleNav(requiredRole, targetPath) {
    console.log("FOOTER CLICK");
    console.log("user object:", user);
    console.log("user.role:", user?.role);
    console.log("requiredRole:", requiredRole);

    if (!user) {
      console.log("→ not logged in");
      navigate("/login", { state: { redirectTo: targetPath } });
      return;
    }

    if (user.role !== requiredRole) {
      console.log("→ role mismatch, redirecting to dashboard");
      navigate("/dashboard");
      return;
    }

    console.log("→ role match, navigating to", targetPath);
    navigate(targetPath);
  }

  // 🔹 shared button style (looks like link)
  const linkBtn = {
    background: "none",
    border: "none",
    padding: 0,
    color: "#2563eb",
    cursor: "pointer",
    fontSize: "14px"
  };*/

/*  return (
    <footer
      style={{
        marginTop: "60px",
        padding: "40px 20px",
        background: "#f9fafb",
        borderTop: "1px solid #e5e7eb",
        fontSize: "14px",
        color: "#374151"
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "24px"
        }}
      >
        {// ABOUT }
        <div>
          <h4>About Monopsy</h4>
          <p style={{ marginTop: "8px", color: "#6b7280" }}>
            Monopsy is a local job marketplace connecting skilled workers
            with trusted employers for short-term and task-based work.
          </p>
        </div>

        {//FOR EMPLOYERS }
        <div>
          <h4>For Employers</h4>
          <ul style={{ listStyle: "none", padding: 0, marginTop: "8px" }}>
            <li>
              <button
                style={linkBtn}
                onClick={() =>
                  handleNav("ROLE_EMPLOYER", "/employer/post-job")
                }
              >
                Post a Job
              </button>
            </li>

            <li>
              <button
                style={linkBtn}
                onClick={() =>
                  handleNav("ROLE_EMPLOYER", "/employer/jobs")
                }
              >
                Hire Verified Workers
              </button>
            </li>

            <li>
              <button
                style={linkBtn}
                onClick={() =>
                  handleNav("ROLE_EMPLOYER", "/employer/jobs")
                }
              >
                Manage Applications
              </button>
            </li>
          </ul>
        </div>

        {// FOR WORKERS }
        <div>
          <h4>For Workers</h4>
          <ul style={{ listStyle: "none", padding: 0, marginTop: "8px" }}>
            <li>
              <button
                style={linkBtn}
                onClick={() => handleNav("ROLE_WORKER", "/jobs")}
              >
                Find Local Jobs
              </button>
            </li>

            <li>
              <button
                style={linkBtn}
                onClick={() =>
                  handleNav("ROLE_WORKER", "/worker/profile")
                }
              >
                Create Worker Profile
              </button>
            </li>

            <li>
              <button
                style={linkBtn}
                onClick={() =>
                  handleNav("ROLE_WORKER", "/worker/jobs")
                }
              >
                Get Rated & Hired
              </button>
            </li>
          </ul>
        </div>

        {// QUICK LINKS }
        <div>
          <h4>Quick Links</h4>
          <ul style={{ listStyle: "none", padding: 0, marginTop: "8px" }}>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms & Conditions</Link></li>
          </ul>
        </div>
      </div>

      <div
        style={{
          marginTop: "30px",
          paddingTop: "16px",
          borderTop: "1px solid #e5e7eb",
          textAlign: "center",
          color: "#6b7280"
        }}
      >
        © {new Date().getFullYear()} Monopsy. All rights reserved.
      </div>
    </footer>
  );
}
*/
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Footer() {
  const { user } = useAuth();
  const navigate = useNavigate();

  function handleNav(requiredRole, targetPath) {
    if (!user) {
      navigate("/login", { state: { redirectTo: targetPath } });
      return;
    }
    if (user.role !== requiredRole) {
      navigate("/dashboard");
      return;
    }
    navigate(targetPath);
  }

  return (
    <footer style={footer}>
      <div style={container}>
        <div style={grid}>

          {/* FOR EMPLOYERS */}
          <div style={columnCompact}>
            <h4 style={heading}>For Employers</h4>

            <div
              style={inputBox}
              onClick={() => handleNav("ROLE_EMPLOYER", "/employer/post-job")}
            >
              <input
                style={fakeInput}
                type="text"
                placeholder="Post a Jobs"
                readOnly
              />
            </div>
          </div>

          {/* FOR WORKERS */}
          <div style={columnCompact}>
            <h4 style={heading}>For Workers</h4>

            <div
              style={inputBox}
              onClick={() => handleNav("ROLE_WORKER", "/jobs")}
            >
              <input
                style={fakeInput}
                type="text"
                placeholder="Find Jobs"
                readOnly
              />
            </div>
          </div>

          {/* QUICK LINKS */}
          <div style={quickLinksNew}>
  <h4 style={heading}>Quick Links</h4>

  <Link style={quickRow} to="/about">
    <span>ℹ️</span>
    <span>About Monopsy</span>
    <span style={arrow}>›</span>
  </Link>

  <Link style={quickRow} to="/contact">
    <span>📞</span>
    <span>Contact Support</span>
    <span style={arrow}>›</span>
  </Link>

  <Link style={quickRow} to="/privacy">
    <span>🔒</span>
    <span>Privacy & Safety</span>
    <span style={arrow}>›</span>
  </Link>

  <Link style={quickRow} to="/terms">
    <span>📄</span>
    <span>Terms & Conditions</span>
    <span style={arrow}>›</span>
  </Link>
</div>



          {/* FOLLOW US */}
          <div style={columnCompact}>
            <h4 style={heading}>Follow Us</h4>
            <div style={socialRow}>
              <div style={socialIcon}>f</div>
              <div style={socialIcon}>🔔</div>
              <div style={socialIcon}>📷</div>
              <div style={socialIcon}>💬</div>
            </div>
          </div>

        </div>

        <div style={bottom}>
          © {new Date().getFullYear()} Monopsy. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

/* ================= STYLES ================= */

const footer = {
  marginTop: "5px",
  padding: "25px 0px 10px",
  background: "#f5f2ef",
  borderTop: "1px solid #e5e7eb",
  boxShadow: "6px 12px 16px rgba(0,0,0,0.12)",
  borderRadius:"20px",

};

const container = {
  maxWidth: "1300px",
  margin: "0 auto"
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: "30px",
  marginBottom: "20px"
};

/* 🔹 Compact column (gap FIXED) */
const columnCompact = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "15px" // 🔥 yahi gap kam kiya
};

const heading = {
  fontSize: "17px",
  fontWeight: "700",
  color: "#111827",
  textAlign: "center",
  margin: 0
};

/* 🔹 Input-like CTA */
const inputBox = {
  width: "200px",
  padding: "2px 18px",
  borderRadius: "999px",
  background: "#ffffff",
  border: "1px solid #d1d5db",
  boxShadow: "0 6px 16px rgba(0,0,0,0.12)",
  cursor: "pointer"
};

const fakeInput = {
  width: "80%",
  border: "none",
  outline: "none",
  fontSize: "13px",
  fontWeight: "300",
  color: "#374151",
  background: "transparent",
  cursor: "pointer",
  margin:"5px 30px",
  textShadow: "0 1px 1px rgba(0,0,0,0.15)"

};

/* 🔹 Quick Links */
const quickLinksNew = {
  display: "flex",
  flexDirection: "column",
  gap: "10px"
};

const quickRow = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "10px 12px",
  borderRadius: "10px",
  textDecoration: "none",
  color: "#1f2937",
  fontSize: "14px",
  fontWeight: "500",
  background: "rgba(255,255,255,0.6)",
  transition: "all 0.2s ease"
};

const arrow = {
  marginLeft: "auto",
  color: "#9ca3af",
  fontSize: "18px"
};


/* 🔹 Social Icons */
const socialRow = {
  display: "flex",
  gap: "14px"
};

const socialIcon = {
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  background: "#ffffff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "16px",
  boxShadow: "0 6px 14px rgba(0,0,0,0.15)",
  cursor: "pointer"
};

/* 🔹 Bottom */
const bottom = {
  borderTop: "1px solid #d1d5db",
  paddingTop: "16px",
  textAlign: "center",
  fontSize: "13px",
  color: "#6b7280"
};
