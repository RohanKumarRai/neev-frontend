import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Footer() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // 🔹 SINGLE HELPER — SOLVES EVERYTHING
  function handleNav(requiredRole, targetPath) {
    if (!user) {
      navigate("/login", { state: { redirectTo: targetPath } });
      return;
    }

    if (user?.role !== requiredRole) {
      navigate("/dashboard");
      return;
    }

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
  };

  return (
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
        {/* ABOUT */}
        <div>
          <h4>About Monopsy</h4>
          <p style={{ marginTop: "8px", color: "#6b7280" }}>
            Monopsy is a local job marketplace connecting skilled workers
            with trusted employers for short-term and task-based work.
          </p>
        </div>

        {/* FOR EMPLOYERS */}
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

        {/* FOR WORKERS */}
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

        {/* QUICK LINKS */}
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
