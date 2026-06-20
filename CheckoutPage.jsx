// src/pages/CheckoutPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CheckoutPage({ bookingDetails, currentUser }) {
  const [passengerName, setPassengerName] = useState('');
  const [booked, setBooked] = useState(false);
  const navigate = useNavigate();

  if (!bookingDetails) {
    return <div style={{ padding: '20px', color: '#fff' }}>No booking information found.</div>;
  }

  const handlePaymentSubmit = (e) => {
    e.preventDefault();

    // 1. Create the structured booking payload matching your state setup
    const newBooking = {
      bookedBy: currentUser || 'Guest', // Tie it to the logged in user
      passengerName: passengerName,
      flightId: bookingDetails.flight.id,
      flightName: bookingDetails.flight.airline,
      origin: bookingDetails.flight.from,
      destination: bookingDetails.flight.to,
      seats: bookingDetails.seats,
      totalPrice: bookingDetails.totalPrice,
      departure: bookingDetails.flight.departure
    };

    // 2. Fetch old bookings list from local storage, push new array, save back
    const existingBookings = localStorage.getItem('wingspan_bookings');
    const bookingsArray = existingBookings ? JSON.parse(existingBookings) : [];
    bookingsArray.push(newBooking);
    localStorage.setItem('wingspan_bookings', JSON.stringify(bookingsArray));

    // 3. Trigger ticket confirmation screen display
    setBooked(true);
  };

  if (booked) {
    return (
      <div style={{ padding: '30px', border: '2px dashed #28a745', maxWidth: '500px', margin: '40px auto', fontFamily: 'Arial, sans-serif', borderRadius: '8px', background: '#222', color: '#fff' }}>
        <h2 style={{ color: '#28a745', marginTop: 0 }}>🎉 Ticket Confirmed!</h2>
        <hr style={{ borderColor: '#444' }} />
        <p><strong>Passenger Name:</strong> {passengerName}</p>
        <p><strong>Flight:</strong> {bookingDetails.flight.airline} ({bookingDetails.flight.id})</p>
        <p><strong>Route:</strong> {bookingDetails.flight.from} ➡️ {bookingDetails.flight.to}</p>
        <p><strong>Assigned Seats:</strong> {bookingDetails.seats.join(', ')}</p>
        <p><strong>Departure Time:</strong> {bookingDetails.flight.departure}</p>
        <hr style={{ borderColor: '#444' }} />
        <h3 style={{ margin: 0 }}>Total Amount Paid: ₹{bookingDetails.totalPrice}</h3>
        
        <button 
          onClick={() => navigate('/bookings')} 
          style={{ width: '100%', padding: '12px', background: '#007bff', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: '5px', fontSize: '15px', fontWeight: 'bold', marginTop: '20px' }}
        >
          Go to My Bookings Dashboard 📋
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '500px', margin: '0 auto', color: '#fff' }}>
      <h2>💳 Finalize Your Booking</h2>
      <div style={{ background: '#222', padding: '15px', borderRadius: '5px', marginBottom: '20px' }}>
        <h4>Booking Summary</h4>
        <p>{bookingDetails.flight.airline} | Seats: {bookingDetails.seats.join(', ')}</p>
        <strong>Total Amount: ₹{bookingDetails.totalPrice}</strong>
      </div>

      <form onSubmit={handlePaymentSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <label>
          Passenger Full Name:
          <input
            type="text"
            required
            value={passengerName}
            onChange={(e) => setPassengerName(e.target.value)}
            style={{ width: '100%', padding: '10px', marginTop: '5px', color: '#000' }}
          />
        </label>
        <label>
          Mock Card Details:
          <input
            type="text"
            placeholder="1234 5678 9101 1121"
            required
            style={{ width: '100%', padding: '10px', marginTop: '5px', color: '#000' }}
          />
        </label>
        <button type="submit" style={{ padding: '12px', background: '#28a745', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: '5px', fontSize: '16px' }}>
          Simulate Payment
        </button>
      </form>
    </div>
  );
}