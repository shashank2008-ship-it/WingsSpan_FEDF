// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SearchPage from './pages/SearchPage';
import SeatMapPage from './pages/SeatMapPage';
import CheckoutPage from './pages/CheckoutPage';
import MyBookingsPage from './pages/MyBookingsPage'; // Import Dashboard

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(''); // Track the string username
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [bookingDetails, setBookingDetails] = useState(null);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser('');
    setSelectedFlight(null);
    setBookingDetails(null);
  };

  return (
    <Router>
      <nav style={{ background: '#111', padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #333' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold', fontSize: '18px' }}>🦅 WingSpan Portal</Link>
          {isLoggedIn && (
            <Link to="/bookings" style={{ color: '#aaa', textDecoration: 'none', fontSize: '14px' }}>📋 My Bookings</Link>
          )}
        </div>
        {isLoggedIn && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <span style={{ color: '#fff', fontSize: '14px' }}>👤 {currentUser}</span>
            <button onClick={handleLogout} style={{ background: '#dc3545', color: '#fff', border: 'none', padding: '8px 15px', borderRadius: '4px', cursor: 'pointer' }}>
              Logout
            </button>
          </div>
        )}
      </nav>

      <Routes>
        {/* Login Route */}
        <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} setCurrentUser={setCurrentUser} />} />

        {/* Protected Routes */}
        <Route 
          path="/" 
          element={isLoggedIn ? <SearchPage setSelectedFlight={setSelectedFlight} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/seats" 
          element={isLoggedIn ? <SeatMapPage selectedFlight={selectedFlight} setBookingDetails={setBookingDetails} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/checkout" 
          element={isLoggedIn ? <CheckoutPage bookingDetails={bookingDetails} currentUser={currentUser} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/bookings" 
          element={isLoggedIn ? <MyBookingsPage currentUser={currentUser} /> : <Navigate to="/login" />} 
        />
      </Routes>
    </Router>
  );
}