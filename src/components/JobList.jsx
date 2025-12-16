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

  // ✅ REPLACED FUNCTION (your requested version)
  const applyToJob = async (jobId) => {
    setError("");
    setSuccess("");

    try {
      await api.post(`/jobs/${jobId}/apply`);
      setSuccess("✅ Applied successfully!");
    } catch (err) {
      console.error("Apply Error:", err);

      if (err.response && err.response.data) {
        setError(err.response.data);
      } else {
        setError("Failed to apply.");
      }
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
      <div className="card" style={{ width: "100%", maxWidth: "900px" }}>
        <h2>Available Jobs</h2>

        {error && <div className="alert err">{error}</div>}
        {success && <div className="alert ok">{success}</div>}

        {jobs.length === 0 ? (
          <p>No jobs available right now.</p>
        ) : (
          jobs.map((job) => (
            <div key={job.id} className="job-card">
              <h3>{job.title}</h3>
              <p><b>Description:</b> {job.description}</p>
              <p><b>Location:</b> {job.location}</p>
              <p><b>Category:</b> {job.category}</p>
              <p><b>Job Type:</b> {job.jobType}</p>
              <p><b>Salary:</b> {job.salary}</p>
              <p><b>Contact:</b> {job.contactPhone}</p>
              <p><b>Status:</b> {job.status}</p>

              <button
                className="btn"
                onClick={() => applyToJob(job.id)}
                disabled={job.status !== "OPEN"}
              >
                {job.status === "OPEN" ? "Apply" : "Not Available"}
              </button>

              <hr />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
