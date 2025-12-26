// src/components/Profile.jsx

// import React from 'react';
// import WorkerProfile from './WorkerProfile';

// export default function Profile() {
//   return <WorkerProfile />;
// }
import React, { useState } from "react";

export default function WorkerProfile() {
  const [form, setForm] = useState({
    name: "",
    skill: "",
    location: "",
    experience: "",
    rate: "",
    jobType: "FULL_TIME",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile Saved (API later)");
  };

  return (
    <div className="profile-page">
      <div className="profile-card">

        {/* LEFT FORM */}
        <div className="profile-form">
          <h2>Create Worker Profile</h2>
          <p className="profile-subtitle">
            Complete your profile to get better job matches
          </p>

          <form onSubmit={handleSubmit}>
            <input name="name" placeholder="Full Name" onChange={handleChange} />
            <input name="skill" placeholder="Skill (Plumber, Driver...)" onChange={handleChange} />
            <input name="location" placeholder="Location" onChange={handleChange} />
            <input name="experience" placeholder="Experience (years)" onChange={handleChange} />
            <input name="rate" placeholder="Daily Rate (₹)" onChange={handleChange} />

            <select name="jobType" onChange={handleChange}>
              <option value="FULL_TIME">Full Time</option>
              <option value="PART_TIME">Part Time</option>
              <option value="DAILY">Daily</option>
            </select>

            <button className="btn">Save Profile</button>
          </form>
        </div>

        {/* RIGHT INFO PANEL */}
        <div className="profile-info">
          <h3>💡 Why complete profile?</h3>
          <ul>
            <li>✔ Get matched faster</li>
            <li>✔ Trusted by employers</li>
            <li>✔ Higher chance of hiring</li>
          </ul>

          <div className="profile-preview">
            <h4>Preview</h4>
            <p><b>Name:</b> {form.name || "—"}</p>
            <p><b>Skill:</b> {form.skill || "—"}</p>
            <p><b>Location:</b> {form.location || "—"}</p>
            <p><b>Rate:</b> ₹{form.rate || "—"}</p>
          </div>
        </div>

      </div>
    </div>
  );
}
