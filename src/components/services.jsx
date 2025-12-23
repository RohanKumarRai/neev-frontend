export default function Services() {
  return (
    <section style={section}>
      <h2 style={heading}>
        OUR <span style={{ color: "#2563eb" }}>SERVICES</span>
      </h2>

      <div style={grid}>
        <div style={card}>
          <div style={icon}>🛠</div>
          <h3>Skilled Workers</h3>
          <p>Find verified and skilled local workers for every job.</p>
        </div>

        <div style={card}>
          <div style={icon}>⚡</div>
          <h3>Quick Hiring</h3>
          <p>Post a job and get applications within minutes.</p>
        </div>

        <div style={card}>
          <div style={icon}>🔒</div>
          <h3>Trusted Platform</h3>
          <p>Secure system with role-based access and verification.</p>
        </div>
      </div>
    </section>
  );
}

/* ================= STYLES ================= */

const section = {
  padding: "70px 20px",
  background: "#ffffff",
  textAlign: "center"
};

const heading = {
  fontSize: "36px",
  marginBottom: "50px",
  fontWeight: "700"
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "30px",
  maxWidth: "1100px",
  margin: "0 auto"
};

const card = {
  padding: "30px",
  borderRadius: "14px",
  background: "#f9fafb",
  boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
  transition: "transform 0.3s"
};

const icon = {
  fontSize: "42px",
  marginBottom: "15px"
};
