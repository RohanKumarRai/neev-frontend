// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

// Core
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";

// Auth
import Login from "./components/Login";
import Register from "./components/Register";

// Common
import Dashboard from "./components/Dashboard";

// Worker
import JobList from "./components/JobList";
import Profile from "./components/Profile";

// Employer
import CreateJob from "./components/CreateJob";
import EmployerJobs from "./components/EmployerJobs";
import JobApplications from "./components/JobApplications.jsx";
import WorkerJobs from "./components/WorkerJobs";






// Home
const Home = () => <h1>Welcome to NEEV!</h1>;

function App() {
  return (
    <>
      <Header />

      <Routes>
        {/* ================= PUBLIC ================= */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/worker/jobs" element={<WorkerJobs />} />


        {/* ================= COMMON (AUTH) ================= */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* ================= WORKER ================= */}
        <Route
          path="/jobs"
          element={
            <ProtectedRoute>
              <JobList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        {/* ================= route for applications page ================= */}
        <Route
        path="/employer/jobs/:jobId/applications"
        element={
        <ProtectedRoute>
        <JobApplications />
        </ProtectedRoute>
      }
    />
    <Route
     path="/employer/jobs/:jobId/applications"
     element={
    <ProtectedRoute role="EMPLOYER">
      <JobApplications />
    </ProtectedRoute>
    }
  />





        {/* ================= EMPLOYER ================= */}
        <Route
          path="/employer/jobs"
          element={
            <ProtectedRoute>
              <EmployerJobs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employer/jobs/:jobId/applications"
          element={
            <ProtectedRoute>
              <JobApplications />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employer/post-job"
          element={
            <ProtectedRoute>
              <CreateJob />
            </ProtectedRoute>
          }
        />
        <Route
        path="/worker/jobs"
        element={
          <ProtectedRoute>
            <WorkerJobs />
          </ProtectedRoute>
        }
      />


        {/* ================= 404 ================= */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </>
  );
}

export default App;
