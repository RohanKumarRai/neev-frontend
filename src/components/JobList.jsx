import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await api.get("/jobs");
      setJobs(res.data);
    } catch (err) {
      console.error("Fetch Jobs Error:", err);
      setError("Failed to load jobs.");
    } finally {
      setLoading(false);
    }
  };

  const applyToJob = async (jobId) => {
    setError("");
    setSuccess("");

    try {
      await api.post(`/jobs/${jobId}/apply`);
      setSuccess("✅ Applied successfully!");
    } catch (err) {
      console.error("Apply Error:", err);
      setError(
        err.response?.data || "Failed to apply."
      );
    }
  };

  if (loading) {
    return (
      <div className="center">
        <div className="card">Loading jobs...</div>
      </div>
    );
  }

  return (
    <div className="center">
      <div className="card" style={{ maxWidth: "900px", width: "100%" }}>
        <h2 style={{ marginBottom: "20px" }}>Available Jobs</h2>

        {error && <div className="alert err">{error}</div>}
        {success && <div className="alert ok">{success}</div>}

        {jobs.length === 0 ? (
          <p>No jobs available right now.</p>
        ) : (
          <div className="jobs-wrapper">
            {jobs.map((job) => (
              <div key={job.id} className="job-card">
                
                {/* HEADER */}
                <div className="job-header">
                  <h3>{job.title}</h3>
                  <span className={`status ${job.status.toLowerCase()}`}>
                    {job.status}
                  </span>
                </div>

                {/* DESCRIPTION */}
                <p className="job-desc">{job.description}</p>

                {/* META */}
                <div className="job-meta">
                  <span>📍 {job.location}</span>
                  <span>🛠 {job.category}</span>
                  <span>⏱ {job.jobType.replace("_", " ")}</span>
                  <span>📞 {job.contactPhone}</span>
                </div>

                {/* FOOTER */}
                <div className="job-footer">
                  <span className="salary">₹ {job.salary}</span>

                  <button
                    className={`apply-btn ${
                      job.status !== "OPEN" ? "disabled" : ""
                    }`}
                    onClick={() => applyToJob(job.id)}
                    disabled={job.status !== "OPEN"}
                  >
                    {job.status === "OPEN"
                      ? "Apply"
                      : "Not Available"}
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
