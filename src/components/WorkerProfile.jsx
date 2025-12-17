import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

export default function WorkerProfile() {
  const { authData } = useAuth();
  const token = authData?.token;

  const [loading, setLoading] = useState(true);
  const [existingProfile, setExistingProfile] = useState(null);
  const [output, setOutput] = useState('');

  const [fullName, setFullName] = useState('');
  const [skill, setSkill] = useState('');
  const [location, setLocation] = useState('');
  const [experience, setExperience] = useState('');
  const [dailyRate, setDailyRate] = useState('');
  const [availability, setAvailability] = useState('FULL_TIME');

  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await api.get('/workers/me');
        setExistingProfile(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    if (token) loadProfile();
  }, [token]);

  async function createProfile() {
    try {
      const payload = {
        fullName,
        skillCategory: skill,
        location,
        experienceYears: Number(experience),
        dailyRate: Number(dailyRate),
        availability,
        phone: '9999999999'
      };

      const res = await api.post('/workers', payload);
      setExistingProfile(res.data);
      setOutput('Profile created successfully');
    } catch (err) {
      setOutput(err.response?.data?.message || 'Failed to create profile');
    }
  }

  if (loading) return <p>Loading profile...</p>;

  if (existingProfile) {
    return (
      <div className="card" style={{ maxWidth: 500 }}>
        <h3>Worker Profile</h3>
        <p><b>Name:</b> {existingProfile.fullName}</p>
        <p><b>Skill:</b> {existingProfile.skillCategory}</p>
        <p><b>Location:</b> {existingProfile.location}</p>
        <p><b>Experience:</b> {existingProfile.experienceYears} years</p>
        <p><b>Daily Rate:</b> ₹{existingProfile.dailyRate}</p>
        <p><b>Availability:</b> {existingProfile.availability}</p>
        <p style={{ color: 'green' }}>✅ Profile completed</p>
      </div>
    );
  }

  return (
    <div className="card" style={{ maxWidth: 500 }}>
      <h3>Create Worker Profile</h3>

      <input placeholder="Full Name" value={fullName} onChange={e => setFullName(e.target.value)} />
      <input placeholder="Skill" value={skill} onChange={e => setSkill(e.target.value)} />
      <input placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} />
      <input type="number" placeholder="Experience" value={experience} onChange={e => setExperience(e.target.value)} />
      <input type="number" placeholder="Daily Rate" value={dailyRate} onChange={e => setDailyRate(e.target.value)} />

      <select value={availability} onChange={e => setAvailability(e.target.value)}>
        <option value="FULL_TIME">Full Time</option>
        <option value="PART_TIME">Part Time</option>
        <option value="DAILY">Daily</option>
      </select>

      <button onClick={createProfile}>Create Profile</button>
      <p>{output}</p>
    </div>
  );
}
