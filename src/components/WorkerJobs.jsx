import React, { useEffect, useState } from "react";
import api from "../services/api";
import PageLayout from "./PageLayout";

export default function WorkerJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAssignedJobs();
  }, []);

  async function fetchAssignedJobs() {
    try {
      const res = await api.get("/workers/my-jobs");
      setJobs(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load assigned jobs");
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <p>Loading assigned jobs...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (jobs.length === 0) return <p>No assigned jobs yet.</p>;

  return (
    <PageLayout title="My Assigned Jobs">
      {jobs.map(job => (
  <div
    key={job.id}
    style={{
      border: "1px solid #e5e7eb",
      padding: "16px",
      marginBottom: "14px",
      borderRadius: "10px",
      background: "#ffffff",
      boxShadow: "0 1px 3px rgba(0,0,0,0.06)"
    }}
  >
    <h3 style={{ marginBottom: "6px" }}>{job.title}</h3>

    <p style={{ color: "#555", marginBottom: "10px" }}>
      {job.description}
    </p>

    <p><strong>Location:</strong> {job.location}</p>
    <p><strong>Category:</strong> {job.category}</p>
    <p><strong>Salary:</strong> {job.salary}</p>

    <p>
      <strong>Status:</strong>{" "}
      <span
        style={{
          padding: "4px 10px",
          borderRadius: "999px",
          fontSize: "12px",
          fontWeight: "600",
          color: "#fff",
          background:
            job.status === "ASSIGNED"
              ? "#2563eb"
              : job.status === "COMPLETED"
              ? "#16a34a"
              : "#6b7280"
        }}
      >
        {job.status}
      </span>
    </p>
  </div>
))}


    </PageLayout>
  );
}
