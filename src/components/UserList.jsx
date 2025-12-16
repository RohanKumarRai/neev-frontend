// src/components/UserList.jsx

import React, { useState, useEffect } from 'react';
import api from '../services/api'; // The secured API client
import { useAuth } from '../context/AuthContext.jsx';

export default function UserList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    
    // We can use the current user's role to adjust the view if necessary
    const { user } = useAuth(); 

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                // Assuming your Spring Boot backend has a secured GET endpoint 
                // to fetch all users, perhaps at /api/users/all or /api/users
                // The JWT is automatically attached by api.js!
                const response = await api.get('/users/all'); 
                setUsers(response.data); // Assuming response.data is an array of users
            } catch (err) {
                console.error('Failed to fetch users:', err);
                // Common errors here are 403 Forbidden (if the user role is wrong) or 401 (token expired)
                setError('Failed to load user list. Check network or security permissions.');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []); // Empty dependency array means this runs once on mount

    if (loading) {
        return <div className="center">Loading registered users...</div>;
    }

    if (error) {
        return <div className="center"><div className="alert err">Error: {error}</div></div>;
    }
    
    // Simple table view to display the data
    return (
        <div style={{ padding: '20px' }}>
            <h2>Registered Users ({users.length})</h2>
            <table style={tableStyle}>
                <thead>
                    <tr>
                        <th style={thStyle}>ID</th>
                        <th style={thStyle}>Name</th>
                        <th style={thStyle}>Email</th>
                        <th style={thStyle}>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td style={tdStyle}>{user.id}</td>
                            <td style={tdStyle}>{user.name}</td>
                            <td style={tdStyle}>{user.email}</td>
                            <td style={tdStyle}>{user.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

// Simple inline styles for the table (can be moved to index.css)
const tableStyle = { width: '100%', borderCollapse: 'collapse', marginTop: '15px' };
const thStyle = { border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2', textAlign: 'left' };
const tdStyle = { border: '1px solid #ddd', padding: '8px' };