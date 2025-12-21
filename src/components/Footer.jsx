import { Link } from "react-router-dom";

export default function Footer() {
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
              <Link to="/login" state={{ redirectTo: "/employer/post-job" }}>
                Post a Job
              </Link>
            </li>

            <li>
              <Link to="/login" state={{ redirectTo: "/employer/jobs" }}>
                Hire Verified Workers
              </Link>
            </li>

            <li>
              <Link
                to="/login"
                state={{ redirectTo: "/employer/jobs" }}
              >
                Manage Applications
              </Link>
            </li>
          </ul>
        </div>

        {/* FOR WORKERS */}
        <div>
          <h4>For Workers</h4>
          <ul style={{ listStyle: "none", padding: 0, marginTop: "8px" }}>
            <li>
              <Link to="/jobs">Find Local Jobs</Link>
            </li>

            <li>
              <Link
                to="/login"
                state={{ redirectTo: "/worker/profile" }}
              >
                Create Worker Profile
              </Link>
            </li>

            <li>
              <Link
                to="/login"
                state={{ redirectTo: "/worker/jobs" }}
              >
                Get Rated & Hired
              </Link>
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
