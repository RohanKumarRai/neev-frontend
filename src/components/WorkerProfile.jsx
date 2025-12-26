import React, { useState } from "react";

export default function WorkerProfile() {
  const [form, setForm] = useState({
    name: "",
    skill: "",
    otherSkill: "",
    location: "",
    experience: "",
    rate: "",
    jobType: "FULL_TIME",
  });

  const skills = [
    "Plumber",
    "Driver",
    "Electrician",
    "Painter",
    "Carpenter",
    "Mechanic",
    "Other",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <div className="center">
      <div
        className="card"
        style={{
          maxWidth: "900px",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "24px",
        }}
      >
        {/* LEFT FORM */}
        <div>
          <h2>Create Worker Profile</h2>
          <p style={{ color: "#6b7280", marginBottom: "20px" }}>
            Complete your profile to get better job matches
          </p>

          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
          />

          {/* ✅ SKILL DROPDOWN */}
          <select
            name="skill"
            value={form.skill}
            onChange={handleChange}
          >
            <option value="">Select Skill</option>
            {skills.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          {/* ✅ OTHER SKILL INPUT */}
          {form.skill === "Other" && (
            <input
              name="otherSkill"
              placeholder="Enter your skill"
              value={form.otherSkill}
              onChange={handleChange}
            />
          )}

          <input
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
          />

          <input
            name="experience"
            placeholder="Experience (years)"
            value={form.experience}
            onChange={handleChange}
            type="number"
          />

          <input
            name="rate"
            placeholder="Daily Rate (₹)"
            value={form.rate}
            onChange={handleChange}
            type="number"
          />

          <select
            name="jobType"
            value={form.jobType}
            onChange={handleChange}
          >
            <option value="FULL_TIME">Full Time</option>
            <option value="PART_TIME">Part Time</option>
            <option value="DAILY">Daily</option>
          </select>

          <button className="btn" style={{ marginTop: "10px" }}>
            Save Profile
          </button>
        </div>

        {/* RIGHT PREVIEW */}
        <div
          style={{
            background: "#f9fafb",
            padding: "16px",
            borderRadius: "10px",
            border: "1px solid #e5e7eb",
          }}
        >
          <h3>Preview</h3>
          <p><b>Name:</b> {form.name || "—"}</p>
          <p>
            <b>Skill:</b>{" "}
            {form.skill === "Other"
              ? form.otherSkill || "—"
              : form.skill || "—"}
          </p>
          <p><b>Location:</b> {form.location || "—"}</p>
          <p><b>Experience:</b> {form.experience ? `${form.experience} years` : "—"}</p>
          <p><b>Rate:</b> {form.rate ? `₹${form.rate}` : "—"}</p>
          <p><b>Job Type:</b> {form.jobType.replace("_", " ")}</p>
        </div>
      </div>
    </div>
  );
}
