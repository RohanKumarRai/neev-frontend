import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

export default function JobApplications() {
  const { jobId } = useParams();
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchApplications();
  }, [jobId]);

  async function fetchApplications() {
    try {
      const res = await api.get(`/jobs/${jobId}/applications`);
      setApps(res.data);
    } catch (err) {
      setError("Failed to load applications");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function decide(appId, accept) {
    try {
      const action = accept ? "accept" : "reject";
      await api.post(`/jobs/applications/${appId}/${action}`);
      fetchApplications(); // refresh list
    } catch (err) {
      alert("Action failed");
    }
  }

  if (loading) return <p>Loading applications...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="card">
      <h2>Job Applications</h2>

      {apps.length === 0 ? (
        <p>No applications yet.</p>
      ) : (
        apps.map(app => (
          <div key={app.id} className="job-card">
            <p><b>Worker ID:</b> {app.workerId}</p>
            <p><b>Message:</b> {app.message || "—"}</p>
            <p><b>Status:</b> {app.status}</p>

            {app.status === "PENDING" && (
              <>
                <button onClick={() => decide(app.id, true)}>
                  Accept
                </button>
                <button onClick={() => decide(app.id, false)}>
                  Reject
                </button>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}
