export default function PageLayout({ title, children }) {
  return (
    <div style={{ maxWidth: "900px", margin: "20px auto", padding: "0 16px" }}>
      <h2 style={{ marginBottom: "16px" }}>{title}</h2>
      {children}
    </div>
  );
}
