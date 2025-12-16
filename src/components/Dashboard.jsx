import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

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

        <div className="dashboard-grid">
          {/* ================= WORKER ================= */}
          {isWorker && (
            <>
              <div
                className="dashboard-tile"
                onClick={() => navigate("/jobs")}
              >
                <h3>📜 Browse Jobs</h3>
                <p>Find and apply for available jobs.</p>
              </div>

              <div
                className="dashboard-tile"
                onClick={() => navigate("/profile")}
              >
                <h3>📝 Update Profile</h3>
                <p>Manage your skills, location, and contact information.</p>
              </div>
            </>
          )}

          {/* ================= EMPLOYER ================= */}
          {isEmployer && (
            <>
              <div
                className="dashboard-tile"
                onClick={() => navigate("/employer/post-job")}
              >
                <h3>➕ Post a New Job</h3>
                <p>Create a new listing for workers to apply to.</p>
              </div>

              <div
                className="dashboard-tile"
                onClick={() => navigate("/employer/jobs")}
              >
                <h3>💼 Manage Postings</h3>
                <p>View applications and manage your job listings.</p>
              </div>
            </>
          )}
        </div>

        <hr style={{ margin: "20px 0" }} />

        <button className="btn btn-secondary" onClick={handleLogout}>
          Sign Out
        </button>
      </div>
    </div>
  );
}
