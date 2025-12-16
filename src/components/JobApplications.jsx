import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const API = 'http://localhost:8080';

export default function JobApplications() {
  const { jobId } = useParams();
  const { token } = useAuth();
  const [apps, setApps] = useState([]);

  useEffect(() => {
    fetch(`${API}/api/jobs/${jobId}/applications`, {
      headers: { Authorization: 'Bearer ' + token }
    })
      .then(res => res.json())
      .then(setApps)
      .catch(console.error);
  }, [jobId, token]);

  async function decide(appId, action) {
    await fetch(`${API}/api/jobs/applications/${appId}/${action}`, {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + token }
    });

    // refresh
    setApps(apps.map(a =>
      a.id === appId ? { ...a, status: action === 'accept' ? 'ACCEPTED' : 'REJECTED' } : a
    ));
  }

  return (
    <div className="center">
      <div className="card" style={{ width: 600 }}>
        <h3>Applications</h3>

        {apps.length === 0 && <p>No applications yet.</p>}

        {apps.map(app => (
          <div key={app.id} className="job-card">
            <p>Worker ID: {app.workerId}</p>
            <p>Status: <b>{app.status}</b></p>

            {app.status === 'PENDING' && (
              <>
                <button className="btn" onClick={() => decide(app.id, 'accept')}>
                  Accept
                </button>
                <button className="btn btn-secondary" onClick={() => decide(app.id, 'reject')}>
                  Reject
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
