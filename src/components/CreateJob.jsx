import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function CreateJob() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [jobType, setJobType] = useState("");
  const [salary, setSalary] = useState("");
  const [contactPhone, setContactPhone] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    const jobData = {
      title,
      description,
      location,
      category,
      jobType,
      salary,
      contactPhone,
    };

    try {
      await api.post("/jobs", jobData); // ✅ JWT automatically sent

      setSuccess("✅ Job posted successfully!");

      // clear form
      setTitle("");
      setDescription("");
      setLocation("");
      setCategory("");
      setJobType("");
      setSalary("");
      setContactPhone("");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (err) {
      console.error("Job Post Error:", err);

      if (err.response && err.response.data) {
        setError(err.response.data);
      } else {
        setError("Failed to post job. Network or server error.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="center">
      <div className="card">
        <h2>Post a New Job</h2>

        {error && <div className="alert err">{error}</div>}
        {success && <div className="alert ok">{success}</div>}

        <form onSubmit={handleSubmit}>
          <input
            className="input"
            placeholder="Job Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            className="input"
            placeholder="Job Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <input
            className="input"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />

          {/* ✅ CATEGORY DROPDOWN (FIXED) */}
          <select
            className="input"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            <option value="Plumber">Plumber</option>
            <option value="Electrician">Electrician</option>
            <option value="Cleaner">Cleaner</option>
            <option value="Carpenter">Carpenter</option>
            <option value="Painter">Painter</option>
            <option value="Driver">Driver</option>
            <option value="Mechanic">Mechanic</option>
            <option value="Helper">Helper</option>
          </select>

          {/* ✅ JOB TYPE DROPDOWN (FIXED) */}
          <select
            className="input"
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            required
          >
            <option value="">Select Job Type</option>
            <option value="FULL_TIME">Full Time</option>
            <option value="PART_TIME">Part Time</option>
            <option value="DAILY">Daily</option>
          </select>

          <input
            className="input"
            placeholder="Salary (₹800/day, ₹120/hour, ₹15000/month)"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            required
          />

          <input
            className="input"
            placeholder="Contact Phone"
            value={contactPhone}
            onChange={(e) => setContactPhone(e.target.value)}
            required
          />

          <button className="btn" disabled={loading}>
            {loading ? "Posting..." : "Post Job"}
          </button>
        </form>
      </div>
    </div>
  );
}
