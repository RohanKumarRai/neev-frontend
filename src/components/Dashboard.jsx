import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Dashboard() {
  const { authData, logout } = useAuth();
  const navigate = useNavigate();

  if (!authData?.user || !authData?.role) {
    return (
      <div className="center">
        <div className="card">Loading user data...</div>
      </div>
    );
  }

  const { user, role } = authData;
  const name = user?.name || user?.email?.split("@")[0] || "User";

  const isWorker = role === "ROLE_WORKER";
  const isEmployer = role === "ROLE_EMPLOYER";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="center">
      <div className="card dashboard-card">
        <h1>Welcome, {name}!</h1>
        <p className="subtitle">
          Your role: <b>{role.replace("ROLE_", "")}</b>
        </p>

        <hr style={{ margin: "20px 0" }} />

        {/* ✅ RESPONSIVE GRID */}
        <div className="dashboard-grid">
          {/* ================= WORKER ================= */}
          {isWorker && (
            <>
              <div className="dashboard-tile">
                <h3>🔍 Browse Jobs</h3>
                <p>Find and apply for available jobs</p>
                <Link to="/jobs">Browse Jobs</Link>
              </div>

              <div className="dashboard-tile">
                <h3>🛠 My Jobs</h3>
                <p>View jobs assigned to you</p>
                <Link to="/worker/jobs">My Assigned Jobs</Link>
              </div>

              <div className="dashboard-tile">
                <h3>👤 Update Profile</h3>
                <p>Manage your worker profile</p>
                <Link to="/profile">Update Profile</Link>
              </div>
            </>
          )}

          {/* ================= EMPLOYER ================= */}
          {isEmployer && (
            <>
              <div
                className="dashboard-tile clickable"
                onClick={() => navigate("/employer/post-job")}
              >
                <h3>➕ Post a New Job</h3>
                <p>Create a new listing for workers to apply to.</p>
              </div>

              <div
                className="dashboard-tile clickable"
                onClick={() => navigate("/employer/jobs")}
              >
                <h3>💼 Manage Postings</h3>
                <p>View applications and manage your job listings.</p>
              </div>
            </>
          )}
        </div>

        {/* EXTRA BUTTON (WORKER ONLY) */}
        {isWorker && (
          <>
            <hr style={{ margin: "20px 0" }} />
            <button
              className="btn btn-secondary"
              onClick={() => navigate("/worker/jobs")}
            >
              My Assigned Jobs
            </button>
          </>
        )}

        <hr style={{ margin: "20px 0" }} />

        <button className="btn btn-secondary" onClick={handleLogout}>
          Sign Out
        </button>
      </div>

      {/* ✅ INLINE RESPONSIVE STYLES */}
      <style>{`
        .dashboard-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 16px;
        }

        .dashboard-tile {
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 16px;
          transition: all 0.2s ease;
        }

        .dashboard-tile h3 {
          margin-top: 0;
        }

        .dashboard-tile a {
          color: #2563eb;
          text-decoration: none;
          font-weight: 500;
        }

        .dashboard-tile.clickable {
          cursor: pointer;
        }

        .dashboard-tile.clickable:hover {
          background: #f1f5f9;
          transform: translateY(-2px);
        }

        @media (max-width: 480px) {
          .dashboard-card {
            padding: 14px;
          }
        }
      `}</style>
    </div>
  );
}
