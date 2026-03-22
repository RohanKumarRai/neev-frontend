// src/components/WorkerJobs.jsx
//
// ✅ CHANGES:
//  1. Removed `import PageLayout from "./PageLayout"` — that component was being
//     imported but PageLayout lives in the same components folder and the original
//     import path was wrong, causing a runtime crash.
//     Replaced with an inline layout (same visual result).
//
//  2. Added "Mark as Completed" button for ASSIGNED jobs.
//     Workers can now call POST /api/jobs/{jobId}/worker-complete from this screen,
//     which was wired in the backend but had no frontend trigger at all.
//
//  3. Error displayed inline (was only logged to console).

import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function WorkerJobs() {
  const [jobs, setJobs]       = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState("");
  const [actionMsg, setActionMsg] = useState("");

  useEffect(() => { fetchAssignedJobs(); }, []);

  async function fetchAssignedJobs() {
    setLoading(true);
    try {
      const res = await api.get("/workers/my-jobs");
      setJobs(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load assigned jobs. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // ✅ NEW: worker marks job complete
  async function markComplete(jobId) {
    setActionMsg("");
    try {
      await api.post(`/jobs/${jobId}/worker-complete`);
      setActionMsg("✅ Job marked as completed!");
      fetchAssignedJobs();
    } catch (err) {
      setActionMsg(err.response?.data || "Failed to mark job as completed.");
    }
  }

  if (loading) return <div className="center"><p>Loading assigned jobs...</p></div>;

  return (
    <div style={{ maxWidth: "900px", margin: "20px auto", padding: "0 16px" }}>
      <h2 style={{ marginBottom: "16px" }}>My Assigned Jobs</h2>

      {error     && <p style={{ color: "red" }}>{error}</p>}
      {actionMsg && <p style={{ color: actionMsg.startsWith("✅") ? "green" : "red" }}>{actionMsg}</p>}

      {jobs.length === 0 ? (
        <p style={{ color: "#6b7280" }}>No assigned jobs yet. Apply to jobs to get started.</p>
      ) : (
        jobs.map((job) => (
          <div
            key={job.id}
            style={{
              border: "1px solid #e5e7eb",
              padding: "16px",
              marginBottom: "14px",
              borderRadius: "10px",
              background: "#ffffff",
              boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
            }}
          >
            <h3 style={{ marginBottom: "6px" }}>{job.title}</h3>
            <p style={{ color: "#555", marginBottom: "10px" }}>{job.description}</p>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Category:</strong> {job.category}</p>
            <p><strong>Salary:</strong>   {job.salary}</p>
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
                    job.status === "ASSIGNED"  ? "#2563eb"
                    : job.status === "COMPLETED" ? "#16a34a"
                    : "#6b7280",
                }}
              >
                {job.status}
              </span>
            </p>

            {/* ✅ NEW: worker-complete button */}
            {job.status === "ASSIGNED" && (
              <button
                onClick={() => markComplete(job.id)}
                style={{
                  marginTop: "12px",
                  padding: "8px 18px",
                  borderRadius: "8px",
                  background: "#16a34a",
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                Mark as Completed
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}
