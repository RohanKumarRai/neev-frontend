import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function EmployerJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyJobs();
  }, []);

  async function fetchMyJobs() {
    try {
      const res = await api.get("/jobs/my"); // ✅ NO /api here
      setJobs(res.data);
    } catch (err) {
      console.error("Failed to load jobs", err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <p>Loading jobs...</p>;

  return (
    <div className="card">
      <h2>My Job Postings</h2>

      {jobs.length === 0 ? (
        <p>No jobs posted yet.</p>
      ) : (
        jobs.map((job) => (
          <div key={job.id} className="job-card">
            <h3>{job.title}</h3>
            <p>{job.description}</p>
            <p>
              <b>Location:</b> {job.location}
            </p>
            <p>
              <b>Status:</b> {job.status}
            </p>

            <button
              onClick={() =>
                navigate(`/employer/jobs/${job.id}/applications`)
              }
              style={{ marginTop: 8 }}
            >
              View Applications
            </button>
          </div>
        ))
      )}
    </div>
  );
}
