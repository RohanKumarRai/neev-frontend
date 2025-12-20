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
            <li>Post a Job</li>
            <li>Hire Verified Workers</li>
            <li>Manage Applications</li>
          </ul>
        </div>

        {/* FOR WORKERS */}
        <div>
          <h4>For Workers</h4>
          <ul style={{ listStyle: "none", padding: 0, marginTop: "8px" }}>
            <li>Find Local Jobs</li>
            <li>Create Worker Profile</li>
            <li>Get Rated & Hired</li>
          </ul>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h4>Quick Links</h4>
          <ul style={{ listStyle: "none", padding: 0, marginTop: "8px" }}>
            <li>About Us</li>
            <li>Contact</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
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
