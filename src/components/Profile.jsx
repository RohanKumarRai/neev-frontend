// src/components/Profile.jsx
//
// ✅ CHANGES (this was the biggest broken piece):
//  1. Was a completely static form — handleSubmit just showed an alert("API later").
//     Now fully wired to the backend:
//       - On mount: GET /api/workers/me to load existing profile
//       - If profile exists: pre-fills the form and switches to update mode (PUT)
//       - If no profile: create mode (POST /api/workers)
//
//  2. Photo upload wired: POST /api/workers/{id}/media with multipart form
//
//  3. skillCategory field renamed to match backend DTO (was "skill")
//
//  4. experienceYears, dailyRate sent as numbers not strings (backend expects Integer/Double)

import React, { useState, useEffect } from "react";
import api from "../services/api";

const SKILLS = [
  "Plumber", "Electrician", "Painter", "Carpenter",
  "Driver", "Cleaner", "Mechanic", "Other",
];

export default function Profile() {
  const [form, setForm] = useState({
    fullName: "",
    skillCategory: "",
    customSkill: "",
    location: "",
    experienceYears: "",
    dailyRate: "",
    hourlyRate: "",
    availability: "Full Time",
    bio: "",
    phone: "",
  });

  const [profileId, setProfileId]   = useState(null); // null = no profile yet
  const [photoFile, setPhotoFile]   = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [loading, setLoading]       = useState(true);
  const [saving, setSaving]         = useState(false);
  const [error, setError]           = useState("");
  const [success, setSuccess]       = useState("");

  // ── Load existing profile on mount ──────────────────────────────────
  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await api.get("/workers/me");
        const p = res.data;
        setProfileId(p.id);
        setForm({
          fullName:      p.fullName      || "",
          skillCategory: p.skillCategory || "",
          customSkill:   "",
          location:      p.location      || "",
          experienceYears: p.experienceYears ?? "",
          dailyRate:     p.dailyRate     ?? "",
          hourlyRate:    p.hourlyRate    ?? "",
          availability:  p.availability  || "Full Time",
          bio:           p.bio           || "",
          phone:         p.phone         || "",
        });
        if (p.photoUrl) setPhotoPreview(p.photoUrl);
      } catch (err) {
       const status = err.response?.status;
  if (status === 404 || status === 403) {
    // No profile yet, or worker profile not found — stay in create mode
    // This is normal for a new user
  } else if (status === 401) {
    // Token expired — api.js interceptor will redirect to login
  } else {
    setError("Failed to load profile. Please try again.");
  }
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  // ── Save profile (create or update) ─────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSaving(true);

    const finalSkill =
      form.skillCategory === "Other" ? form.customSkill : form.skillCategory;

    const payload = {
      fullName:       form.fullName,
      skillCategory:  finalSkill,
      location:       form.location,
      experienceYears: form.experienceYears !== "" ? Number(form.experienceYears) : null,
      dailyRate:      form.dailyRate !== ""  ? Number(form.dailyRate)  : null,
      hourlyRate:     form.hourlyRate !== "" ? Number(form.hourlyRate) : null,
      availability:   form.availability,
      bio:            form.bio,
      phone:          form.phone,
    };

    try {
      let savedId = profileId;

      if (profileId) {
        // Update existing
        await api.put(`/workers/${profileId}`, payload);
      } else {
        // Create new
        const res = await api.post("/workers", payload);
        savedId = res.data.id;
        setProfileId(savedId);
      }

      // Upload photo if one was selected
      if (photoFile && savedId) {
        const formData = new FormData();
        formData.append("photo", photoFile);
        await api.post(`/workers/${savedId}/media`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      setSuccess(profileId ? "✅ Profile updated!" : "✅ Profile created!");
    } catch (err) {
      setError(err.response?.data || "Failed to save profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="center"><p>Loading profile...</p></div>;

  const finalSkill =
    form.skillCategory === "Other" ? form.customSkill : form.skillCategory;

  return (
    <div className="profile-page">
      <div className="profile-card">

        {/* ── LEFT: FORM ── */}
        <div className="profile-form">
          <h2>{profileId ? "Update Your Profile" : "Create Worker Profile"}</h2>
          <p style={{ color: "#6b7280", marginBottom: "16px" }}>
            Complete your profile to get better job matches
          </p>

          {error   && <div className="alert err">{error}</div>}
          {success && <div className="alert ok">{success}</div>}

          <form onSubmit={handleSubmit}>
            <input
              name="fullName"
              placeholder="Full Name"
              value={form.fullName}
              onChange={handleChange}
              required
            />

            <select name="skillCategory" value={form.skillCategory} onChange={handleChange} required>
              <option value="">Select Skill</option>
              {SKILLS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>

            {form.skillCategory === "Other" && (
              <input
                name="customSkill"
                placeholder="Enter your skill"
                value={form.customSkill}
                onChange={handleChange}
              />
            )}

            <input
              name="location"
              placeholder="Location (e.g. Delhi, Mumbai)"
              value={form.location}
              onChange={handleChange}
            />

            <input
              name="experienceYears"
              type="number"
              min="0"
              placeholder="Experience (years)"
              value={form.experienceYears}
              onChange={handleChange}
            />

            <input
              name="dailyRate"
              type="number"
              min="0"
              placeholder="Daily Rate (₹)"
              value={form.dailyRate}
              onChange={handleChange}
            />

            <input
              name="hourlyRate"
              type="number"
              min="0"
              placeholder="Hourly Rate (₹) — optional"
              value={form.hourlyRate}
              onChange={handleChange}
            />

            <input
              name="phone"
              placeholder="Phone number"
              value={form.phone}
              onChange={handleChange}
            />

            <textarea
              name="bio"
              placeholder="Short bio — tell employers about yourself"
              value={form.bio}
              onChange={handleChange}
              rows={3}
              style={{ resize: "vertical" }}
            />

            <select name="availability" value={form.availability} onChange={handleChange}>
              <option value="Full Time">Full Time</option>
              <option value="Part Time">Part Time</option>
              <option value="Daily">Daily</option>
            </select>

            {/* Photo upload */}
            <div>
              <label style={{ fontSize: "13px", color: "#6b7280" }}>
                Profile Photo (optional)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                style={{ marginTop: "6px" }}
              />
              {photoPreview && (
                <img
                  src={photoPreview}
                  alt="preview"
                  style={{
                    marginTop: "10px",
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "2px solid #e5e7eb",
                  }}
                />
              )}
            </div>

            <button className="btn" disabled={saving}>
              {saving ? "Saving..." : profileId ? "Update Profile" : "Save Profile"}
            </button>
          </form>
        </div>

        {/* ── RIGHT: PREVIEW ── */}
        <div className="profile-info">
          <h3>💡 Why complete your profile?</h3>
          <ul>
            <li>✔ Get matched faster</li>
            <li>✔ Trusted by employers</li>
            <li>✔ Higher chance of hiring</li>
          </ul>

          <div className="profile-preview">
            <h4>Live Preview</h4>
            {photoPreview && (
              <img
                src={photoPreview}
                alt="avatar"
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  marginBottom: "10px",
                  border: "2px solid #e5e7eb",
                }}
              />
            )}
            <p><b>Name:</b>       {form.fullName     || "—"}</p>
            <p><b>Skill:</b>      {finalSkill        || "—"}</p>
            <p><b>Location:</b>   {form.location     || "—"}</p>
            <p><b>Experience:</b> {form.experienceYears ? `${form.experienceYears} yrs` : "—"}</p>
            <p><b>Daily Rate:</b> {form.dailyRate    ? `₹${form.dailyRate}` : "—"}</p>
            <p><b>Available:</b>  {form.availability || "—"}</p>
          </div>
        </div>

      </div>
    </div>
  );
}
