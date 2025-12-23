import { useEffect, useState } from "react";

export default function WelcomePopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const shown = sessionStorage.getItem("welcome_shown");
    if (!shown) {
      setOpen(true);
      sessionStorage.setItem("welcome_shown", "true");
    }
  }, []);

  if (!open) return null;

  return (
    <div style={overlay}>
      <div style={card}>
        <button style={closeBtn} onClick={() => setOpen(false)}>✕</button>

        <h2 style={title}>Welcome to monopsy!</h2>
        <p style={subtitle}>
          Find the best workers for your needs.
        </p>

        <button style={cta} onClick={() => setOpen(false)}>
          Get Started
        </button>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.55)",
  backdropFilter: "blur(4px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999
};

const card = {
  position: "relative",
  width: "420px",
  maxWidth: "90%",
  background: "#ffffff",
  borderRadius: "16px",
  padding: "32px 28px",
  boxShadow: "0 25px 60px rgba(0,0,0,0.25)",
  textAlign: "center",
  animation: "scaleIn 0.35s ease"
};

const title = {
  fontSize: "26px",
  fontWeight: "700",
  marginBottom: "10px",
  color: "#111827"
};

const subtitle = {
  fontSize: "15px",
  color: "#6b7280",
  marginBottom: "22px"
};

const cta = {
  width: "100%",
  padding: "12px",
  borderRadius: "10px",
  border: "none",
  background: "#2563eb",
  color: "#fff",
  fontSize: "15px",
  fontWeight: "600",
  cursor: "pointer"
};

const closeBtn = {
  position: "absolute",
  top: "14px",
  right: "14px",
  background: "#111827",
  color: "#fff",
  border: "none",
  borderRadius: "50%",
  width: "32px",
  height: "32px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  fontSize: "18px",
  lineHeight: "1"
};


/* 🔥 Animation */
const style = document.createElement("style");
style.innerHTML = `
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}`;
document.head.appendChild(style);
