// src/components/JobList.jsx
//
// ✅ CHANGES:
//  1. Status badge CSS fix: `job.status.toLowerCase()` gives "open"/"assigned"/"completed"
//     but index.css only has .status.OPEN and .status.COMPLETED (uppercase).
//     Fixed to use uppercase class names matching the CSS.
//
//  2. "Already applied" state: backend returns 400/500 with message "Already applied".
//     Frontend now shows that message clearly instead of a generic error.
//
//  3. Per-job apply state: success/error feedback shown under the specific job card,
//     not as a page-level banner that confuses which job was affected.
//
//  4. jobType display fix: job.jobType can be null — added safe fallback.

import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function JobList() {
  const [jobs, setJobs]       = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState("");
  // Per-job feedback: { [jobId]: { msg, ok } }
  const [feedback, setFeedback] = useState({});

  const { role } = useAuth();
  const isEmployer = role === "ROLE_EMPLOYER";

  useEffect(() => { fetchJobs(); }, []);

  const fetchJobs = async () => {
    try {
      const res = await api.get("/jobs");
      setJobs(res.data);
    } catch (err) {
      console.error("Fetch Jobs Error:", err);
      setPageError("Failed to load jobs. Please refresh.");
    } finally {
      setLoading(false);
    }
  };

  const applyToJob = async (jobId) => {
    setFeedback((prev) => ({ ...prev, [jobId]: null }));
    try {
      await api.post(`/jobs/${jobId}/apply`);
      setFeedback((prev) => ({
        ...prev,
        [jobId]: { msg: "✅ Applied successfully!", ok: true },
      }));
    } catch (err) {
      const msg = err.response?.data || "Failed to apply. Please try again.";
      setFeedback((prev) => ({ ...prev, [jobId]: { msg, ok: false } }));
    }
  };

  if (loading) {
    return <div className="center"><div className="card">Loading jobs...</div></div>;
  }

  return (
    <div className="center">
      <div className="card" style={{ maxWidth: "900px", width: "100%" }}>
        <h2 style={{ marginBottom: "20px" }}>Available Jobs</h2>

        {pageError && <div className="alert err">{pageError}</div>}

        {jobs.length === 0 ? (
          <p>No jobs available right now.</p>
        ) : (
          <div className="jobs-wrapper">
            {jobs.map((job) => (
              <div key={job.id} className="job-card">

                <div className="job-header">
                  <h3>{job.title}</h3>
                  {/* ✅ FIX: uppercase class to match index.css */}
                  <span className={`status ${job.status}`}>
                    {job.status}
                  </span>
                </div>

                <p className="job-desc">{job.description}</p>

                <div className="job-meta" style={{ display: "flex", gap: "16px", flexWrap: "wrap", margin: "10px 0", fontSize: "14px", color: "#6b7280" }}>
                  <span>📍 {job.location}</span>
                  <span>🛠 {job.category}</span>
                  {/* ✅ FIX: safe replace in case jobType is null */}
                  <span>⏱ {job.jobType?.replace("_", " ") || "—"}</span>
                  <span>📞 {job.contactPhone}</span>
                </div>

                <div className="job-footer">
                  <span className="salary" style={{ fontWeight: "700", fontSize: "16px" }}>
                    ₹ {job.salary}
                  </span>

                  {/* ✅ FIX: employers can't apply to jobs */}
                  {!isEmployer && (
                    <button
                      className={`apply-btn ${job.status !== "OPEN" ? "disabled" : ""}`}
                      onClick={() => applyToJob(job.id)}
                      disabled={job.status !== "OPEN"}
                    >
                      {job.status === "OPEN" ? "Apply" : "Not Available"}
                    </button>
                  )}
                </div>

                {/* ✅ Per-job feedback */}
                {feedback[job.id] && (
                  <p style={{
                    marginTop: "8px",
                    fontSize: "13px",
                    color: feedback[job.id].ok ? "#16a34a" : "#dc2626",
                  }}>
                    {feedback[job.id].msg}
                  </p>
                )}

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
