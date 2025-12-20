import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Header() {
  const { isAuthenticated, authData, logout } = useAuth();
  const navigate = useNavigate();

  const user = authData?.user;
  const role = authData?.role;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const userDisplayName = user?.name || user?.email?.split('@')[0] || 'User';

  return (
    <header style={headerStyle}>
      <Link to="/" style={logoStyle}>monopsy</Link>

      <nav style={navStyle}>
        {isAuthenticated ? (
          <>
            <span style={userStyle}>Welcome, {userDisplayName}!</span>

            <Link to="/dashboard" style={linkStyle}>Dashboard</Link>

            {role === 'ROLE_EMPLOYER' && (
              <Link to="/create-job" style={linkStyle}>Post Job</Link>
            )}

            <button onClick={handleLogout} style={buttonStyle}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={linkStyle}>Login</Link>
            <Link to="/register" style={buttonStyle}>Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}

// --- Styles ---
const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 20px',
  backgroundColor: '#fff',
  borderBottom: '1px solid #e5e7eb',
};

const logoStyle = {
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#2563eb',
  textDecoration: 'none',
};

const navStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '15px',
};

const linkStyle = {
  color: '#1f2937',
  textDecoration: 'none',
  padding: '5px 10px',
  borderRadius: '4px',
};

const buttonStyle = {
  padding: '8px 12px',
  borderRadius: '6px',
  border: 'none',
  background: '#2563eb',
  color: '#fff',
  cursor: 'pointer',
  textDecoration: 'none',
};

const userStyle = {
  fontSize: '14px',
  color: '#6b7280',
};
