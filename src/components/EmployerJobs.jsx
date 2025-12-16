import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const API = "http://localhost:8080";

export default function EmployerJobs() {
  const { token } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyJobs();
  }, []);

  async function fetchMyJobs() {
    try {
      const res = await fetch(`${API}/api/jobs/my`, {
        headers: {
          Authorization: "Bearer " + token
        }
      });

      if (!res.ok) {
        throw new Error("Failed to load jobs");
      }

      const data = await res.json();
      setJobs(data);
    } catch (err) {
      console.error(err);
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
        jobs.map(job => (
          <div key={job.id} className="job-card">
            <h3>{job.title}</h3>
            <p>{job.description}</p>
            <p><b>Location:</b> {job.location}</p>
            <p><b>Status:</b> {job.status}</p>
          </div>
        ))
      )}
    </div>
  );
}
