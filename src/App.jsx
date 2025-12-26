


import React from "react";
import { Routes, Route } from "react-router-dom";

// Common
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import WelcomePopup from "./components/WelcomePopup";

// Auth & Routes
import ProtectedRoute from "./components/ProtectedRoute";
import RoleRoute from "./components/RoleRoute";

// Pages
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import JobList from "./components/JobList";
import WorkerJobs from "./components/WorkerJobs";
import Profile from "./components/Profile";
import CreateJob from "./components/CreateJob";
import EmployerJobs from "./components/EmployerJobs";
import JobApplications from "./components/JobApplications";

// Static Pages
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Contact from "./pages/Contact";

// Home
import Services from "./components/services";

const Home = () => (
  <>
    <div style={{ textAlign: "center", padding: "80px 20px", background: "#f9fafb" }}>
      <h1 style={{ fontSize: "42px" }}>Welcome to monopsy!</h1>
      <h2 style={{ color: "#4b5563" }}>
        Find the best workers for your needs.
      </h2>
    </div>
    <Services />
  </>
);

export default function App() {
  return (
    <>
      <WelcomePopup />

      <Header />

      {/* ✅ MAIN CONTENT WRAPPER */}
      <main className="main-content">
        <ScrollToTop />

        <Routes>
          {/* PUBLIC */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* AUTH */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* WORKER */}
          <Route
            path="/jobs"
            element={
              <ProtectedRoute>
                <JobList />
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

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* EMPLOYER */}
          <Route
            path="/employer/post-job"
            element={
              <RoleRoute role="ROLE_EMPLOYER">
                <CreateJob />
              </RoleRoute>
            }
          />

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

          {/* 404 */}
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}
