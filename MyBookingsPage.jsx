// src/pages/MyBookingsPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function MyBookingsPage({ currentUser }) {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Fetch all records from local storage
    const allBookings = localStorage.getItem('wingspan_bookings');
    if (allBookings) {
      const parsedBookings = JSON.parse(allBookings);
      // Only show items belonging to the active logged-in user
      const userBookings = parsedBookings.filter(b => b.bookedBy === currentUser);
      setBookings(userBookings);
    }
  }, [currentUser]);

  return (
    <div style={{ padding: '30px', maxWidth: '800px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>✈️ Pass Dashboard: My Bookings</h2>
        <Link to="/" style={{ background: '#007bff', color: '#fff', textDecoration: 'none', padding: '8px 15px', borderRadius: '5px', fontSize: '14px' }}>Book New Flight</Link>
      </div>

      <p>Logged in as: <strong>{currentUser}</strong></p>

      {bookings.length === 0 ? (
        <div style={{ padding: '40px', background: '#f8f9fa', borderRadius: '8px', textAlign: 'center', border: '1px dashed #ccc', marginTop: '20px' }}>
          <h4>No bookings found!</h4>
          <p style={{ color: '#666' }}>You haven't reserved any flights yet.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
          {bookings.map((booking, index) => (
            <div key={index} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px', background: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '10px' }}>
                <span style={{ fontWeight: 'bold', color: '#007bff' }}>Booking Reference #{index + 1001}</span>
                <span style={{ background: '#28a745', color: '#fff', padding: '3px 8px', borderRadius: '4px', fontSize: '12px' }}>Confirmed</span>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '15px' }}>
                <div><strong>Flight:</strong> {booking.flightName} ({booking.flightId})</div>
                <div><strong>Route:</strong> {booking.origin} ➔ {booking.destination}</div>
                <div><strong>Passenger:</strong> {booking.passengerName}</div>
                <div><strong>Seats Reserved:</strong> <span style={{ background: '#e9ecef', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' }}>{booking.seats?.join(', ')}</span></div>
              </div>
              <div style={{ marginTop: '12px', textAlign: 'right', fontWeight: 'bold', color: '#333' }}>
                Total Paid: ₹{booking.totalPrice}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}