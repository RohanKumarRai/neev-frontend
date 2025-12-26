import React, { useState } from "react";

const SKILLS = [
  "Plumber",
  "Electrician",
  "Painter",
  "Carpenter",
  "Driver",
  "Cleaner",
  "Mechanic",
  "Other"
];

export default function WorkerProfile() {
  const [form, setForm] = useState({
    name: "",
    skill: "",
    customSkill: "",
    location: "",
    experience: "",
    rate: "",
    type: "Full Time"
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const finalSkill =
    form.skill === "Other" ? form.customSkill : form.skill;

  return (
    <div className="profile-page">
      <div className="profile-card">

        {/* LEFT */}
        <div className="profile-form">
          <h2>Create Worker Profile</h2>
          <p className="profile-subtitle">
            Complete your profile to get better job matches
          </p>

          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
          />

          {/* ✅ SKILL DROPDOWN */}
          <select name="skill" value={form.skill} onChange={handleChange}>
            <option value="">Select Skill</option>
            {SKILLS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          {/* ✅ OTHER SKILL INPUT */}
          {form.skill === "Other" && (
            <input
              name="customSkill"
              placeholder="Enter your skill"
              value={form.customSkill}
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
          />

          <input
            name="rate"
            placeholder="Daily Rate (₹)"
            value={form.rate}
            onChange={handleChange}
          />

          <select name="type" value={form.type} onChange={handleChange}>
            <option>Full Time</option>
            <option>Part Time</option>
            <option>Daily</option>
          </select>

          <button>Save Profile</button>
        </div>

        {/* RIGHT */}
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
            <p><b>Skill:</b> {finalSkill || "—"}</p>
            <p><b>Location:</b> {form.location || "—"}</p>
            <p><b>Experience:</b> {form.experience ? `${form.experience} yrs` : "—"}</p>
            <p><b>Rate:</b> {form.rate ? `₹${form.rate}` : "—"}</p>
            <p><b>Type:</b> {form.type}</p>
          </div>
        </div>

      </div>
    </div>
  );
}
