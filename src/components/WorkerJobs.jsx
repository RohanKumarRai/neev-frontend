import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function WorkerJobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    loadJobs();
  }, []);

  async function loadJobs() {
    const res = await api.get("/jobs/assigned");
    setJobs(res.data);
  }

  return (
    <div className="card">
      <h2>My Assigned Jobs</h2>

      {jobs.length === 0 ? (
        <p>No assigned jobs</p>
      ) : (
        jobs.map(job => (
          <div key={job.id} className="job-card">
            <h3>{job.title}</h3>
            <p>{job.description}</p>
            <p><b>Status:</b> {job.status}</p>
          </div>
        ))
      )}
    </div>
  );
}
