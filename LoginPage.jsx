// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage({ setIsLoggedIn, setCurrentUser }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // Helper to read users list from LocalStorage so it never wipes out
  const getStoredUsers = () => {
    const users = localStorage.getItem('wingspan_users');
    // If empty, initialize it with your default admin account
    return users ? JSON.parse(users) : [{ username: 'admin', password: '123' }];
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const users = getStoredUsers();

    if (isSignUp) {
      // SIGN UP LOGIC
      const userExists = users.some((u) => u.username.toLowerCase() === username.toLowerCase());
      if (userExists) {
        setError('Username already exists! Choose another.');
        return;
      }

      // Add the new user to the existing list
      const newUsers = [...users, { username, password }];
      
      // CRUCIAL: Save it to LocalStorage permanently!
      localStorage.setItem('wingspan_users', JSON.stringify(newUsers));
      
      setSuccess('Account created successfully! Switching to login...');
      setTimeout(() => {
        setIsSignUp(false);
        setPassword('');
        setSuccess('');
      }, 1500);
    } else {
      // LOGIN LOGIC
      const validUser = users.find((u) => u.username === username && u.password === password);
      if (validUser) {
        setIsLoggedIn(true);
        setCurrentUser(username); // Tells App.jsx who is active
        navigate('/');
      } else {
        setError('Invalid username or password!');
      }
    }
  };

  return (
    <div style={{ padding: '40px 20px', fontFamily: 'Arial, sans-serif', maxWidth: '400px', margin: '80px auto', background: '#222', borderRadius: '8px', color: '#fff', textAlign: 'center' }}>
      <h2>🦅 WingSpan Portal</h2>
      <p style={{ fontSize: '14px', color: '#aaa' }}>{isSignUp ? 'Create a new passenger account' : 'Sign in to manage your flight bookings'}</p>
      
      {error && <p style={{ color: '#dc3545', fontWeight: 'bold', fontSize: '14px' }}>{error}</p>}
      {success && <p style={{ color: '#28a745', fontWeight: 'bold', fontSize: '14px' }}>{success}</p>}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', textAlign: 'left', marginTop: '20px' }}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            required
            style={{ width: '100%', padding: '10px', marginTop: '5px', color: '#000', borderRadius: '4px', border: 'none' }}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
            style={{ width: '100%', padding: '10px', marginTop: '5px', color: '#000', borderRadius: '4px', border: 'none' }}
          />
        </label>
        <button type="submit" style={{ padding: '12px', background: isSignUp ? '#28a745' : '#007bff', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: '5px', fontSize: '16px', fontWeight: 'bold', marginTop: '10px' }}>
          {isSignUp ? 'Register Account' : 'Login'}
        </button>
      </form>

      <hr style={{ borderColor: '#444', margin: '20px 0' }} />

      <button 
        type="button"
        onClick={() => { setIsSignUp(!isSignUp); setError(''); setSuccess(''); }} 
        style={{ background: 'none', border: 'none', color: '#17a2b8', cursor: 'pointer', textDecoration: 'underline' }}
      >
        {isSignUp ? 'Already have an account? Login here' : "Don't have an account? Sign up here"}
      </button>
    </div>
  );
}