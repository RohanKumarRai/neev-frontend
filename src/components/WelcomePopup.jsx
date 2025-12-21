import { useState } from "react";

export default function WelcomePopup() {
  const [open, setOpen] = useState(true);

  if (!open) return null;

  return (
    <div style={overlayStyle}>
      <div style={popupStyle}>
        <h1 style={{ marginBottom: 10 }}>Welcome to monopsy!</h1>
        <p style={{ marginBottom: 20 }}>
          Find the best workers for your needs.
        </p>

        <button style={btnStyle} onClick={() => setOpen(false)}>
          Get Started
        </button>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const overlayStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.6)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 3000
};

const popupStyle = {
  background: "#fff",
  padding: "30px",
  borderRadius: "12px",
  textAlign: "center",
  maxWidth: "420px",
  width: "90%",
  boxShadow: "0 20px 40px rgba(0,0,0,0.25)"
};

const btnStyle = {
  padding: "10px 20px",
  borderRadius: "8px",
  border: "none",
  background: "#2563eb",
  color: "#fff",
  cursor: "pointer",
  fontSize: "14px"
};
