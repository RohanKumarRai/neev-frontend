import React, { useEffect, useState } from "react";
import api from "../services/api";

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

  if (jobs.length === 0) {
    return <p>No assigned jobs yet.</p>;
  }

  return (
    <div>
      <h2>My Assigned Jobs</h2>

      {jobs.map(job => (
        <div
          key={job.id}
          style={{
            border: "1px solid #ccc",
            padding: "12px",
            marginBottom: "12px",
            borderRadius: "6px"
          }}
        >
          <h3>{job.title}</h3>
          <p>{job.description}</p>

          <p>
            <strong>Location:</strong> {job.location}
          </p>

          <p>
            <strong>Category:</strong> {job.category}
          </p>

          <p>
            <strong>Salary:</strong> {job.salary}
          </p>

          <p>
            <strong>Status:</strong> {job.status}
          </p>
        </div>
      ))}
    </div>
  );
}
