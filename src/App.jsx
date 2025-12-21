// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

// Core
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

// Auth
import Login from "./components/Login";
import Register from "./components/Register";

// Common
import Dashboard from "./components/Dashboard";

// Worker
import JobList from "./components/JobList";
import Profile from "./components/Profile";
import WorkerJobs from "./components/WorkerJobs";

// Employer
import CreateJob from "./components/CreateJob";
import EmployerJobs from "./components/EmployerJobs";
import JobApplications from "./components/JobApplications";

// Pages (PUBLIC)
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Contact from "./pages/Contact";

// Home
const Home = () => (
  <div style={{ textAlign: "center", marginTop: 40 }}>
    <h1>Welcome to monopsy!</h1>
    <h2>Find the best workers for your needs.</h2>
  </div>
);

function App() {
  return (
    <>
      <Header />

      <Routes>
        {/* ================= PUBLIC ================= */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ================= PROTECTED ROUTES WITH ROLES ================= */}
        <Route
          path="/post-job"
          element={
            <RoleRoute role="ROLE_EMPLOYER">
              <CreateJob />
            </RoleRoute>
          }
        />

        <Route
          path="/worker/profile"
          element={
            <RoleRoute role="ROLE_WORKER">
              <WorkerProfile />
            </RoleRoute>
          }
        />


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

        <Route
          path="/worker/jobs"
          element={
            <ProtectedRoute>
              <WorkerJobs />
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

        {/* ================= 404 ================= */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
