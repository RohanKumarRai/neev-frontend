// src/components/Register.jsx

import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('WORKER'); 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        const userData = {
            name,
            email,
            password,
            // ⭐️ CONFIRMED FIX: Backend expects ROLE_WORKER / ROLE_EMPLOYER
            role: 'ROLE_' + role.toUpperCase()
        };

        try {
            const response = await api.post('/users', userData);

            setSuccess(`Registration successful for ${response.data.name}! Please login.`);

            setName('');
            setEmail('');
            setPassword('');

            setTimeout(() => {
                navigate('/login');
            }, 2000);

        } catch (err) {
            console.error('Registration API Error Object:', err); // ⭐️ Full error log
            
            let errorMessage = 'Registration failed. Please try again.';

            // ⭐️ Extract meaningful message from backend response DTO
            if (err.response && err.response.data && err.response.data.message) {
                errorMessage = err.response.data.message;

            } else if (
                err.response && 
                err.response.data && 
                typeof err.response.data === 'string'
            ) {
                // ⭐️ Handles raw string messages from Spring Security filters
                errorMessage = err.response.data;

            } else if (err.response && err.response.data) {
                console.error('Backend Data:', err.response.data);
            }

            setError(errorMessage);

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="center">
            <div className="card">
                <div className="h1">Neev — Register</div>
                
                {error && <div className="alert err">Error: {error}</div>}
                {success && <div className="alert ok">{success}</div>}

                <form onSubmit={handleSubmit}>
                    
                    {/* Role Selection */}
                    <label>I am registering as:
                        <select 
                            className="input" 
                            value={role} 
                            onChange={e => setRole(e.target.value)}
                        >
                            <option value="WORKER">Worker (Looking for jobs)</option>
                            <option value="EMPLOYER">Employer (Posting jobs)</option>
                        </select>
                    </label>

                    {/* Name */}
                    <label>Full Name
                        <input 
                            className="input" 
                            type="text" 
                            required 
                            value={name} 
                            onChange={e => setName(e.target.value)} 
                            placeholder="John Doe" 
                        />
                    </label>

                    {/* Email */}
                    <label>Email
                        <input 
                            className="input" 
                            type="email" 
                            required 
                            value={email} 
                            onChange={e => setEmail(e.target.value)} 
                            placeholder="you@example.com" 
                        />
                    </label>

                    {/* Password */}
                    <label>Password
                        <input 
                            className="input" 
                            type="password" 
                            required 
                            value={password} 
                            onChange={e => setPassword(e.target.value)} 
                            placeholder="Secure password" 
                        />
                    </label>
                    
                    <div style={{ marginTop: 15 }}>
                        <button className="btn" disabled={loading}>
                            {loading ? 'Registering...' : 'Create Account'}
                        </button>
                    </div>
                </form>
                
                <div style={{ marginTop: 12, fontSize: 13, color: '#6b7280' }}>
                    Already have an account? <a href="/login">Sign in here.</a>
                </div>
            </div>
        </div>
    );
}
