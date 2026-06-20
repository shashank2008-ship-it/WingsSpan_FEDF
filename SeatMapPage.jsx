// src/pages/SeatMapPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SeatMapPage({ selectedFlight, setBookingDetails }) {
  const navigate = useNavigate();
  
  if (!selectedFlight) {
    return <div style={{ padding: '20px', color: '#fff' }}>Please go back and select a flight first.</div>;
  }

  const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
  const cols = [1, 2, 3, 4];
  
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [occupiedSeats] = useState(['A2', 'C3', 'E1']); 

  useEffect(() => {
    const saved = localStorage.getItem(`seats-${selectedFlight.id}`);
    if (saved) {
      setSelectedSeats(JSON.parse(saved));
    }
  }, [selectedFlight]);

  const handleSeatClick = (seatId) => {
    let updatedSeats;
    if (selectedSeats.includes(seatId)) {
      updatedSeats = selectedSeats.filter(s => s !== seatId);
    } else {
      updatedSeats = [...selectedSeats, seatId];
    }
    
    setSelectedSeats(updatedSeats);
    localStorage.setItem(`seats-${selectedFlight.id}`, JSON.stringify(updatedSeats)); 
  };

  const handleCheckout = () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat.");
      return;
    }
    setBookingDetails({
      flight: selectedFlight,
      seats: selectedSeats,
      totalPrice: selectedSeats.length * selectedFlight.price
    });
    navigate('/checkout');
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', textAlign: 'center', color: '#fff' }}>
      <h2>✈️ Choose Seats for {selectedFlight.airline} ({selectedFlight.id})</h2>
      <p>Base Ticket Fare per seat: <strong>Rupees {selectedFlight.price}</strong></p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 50px)', gap: '10px', justifyContent: 'center', margin: '30px auto' }}>
        {rows.map(row => 
          cols.map(col => {
            const seatId = `${row}${col}`;
            const isOccupied = occupiedSeats.includes(seatId);
            const isSelected = selectedSeats.includes(seatId);

            let bg = '#6c757d'; 
            if (isOccupied) bg = '#dc3545'; 
            if (isSelected) bg = '#28a745'; 

            return (
              <button
                key={seatId}
                disabled={isOccupied}
                onClick={() => handleSeatClick(seatId)}
                style={{ width: '50px', height: '50px', background: bg, color: '#fff', border: 'none', borderRadius: '5px', cursor: isOccupied ? 'not-allowed' : 'pointer', fontWeight: 'bold' }}
              >
                {seatId}
              </button>
            );
          })
        )}
      </div>

      <div style={{ marginTop: '20px' }}>
        <p>Selected Seats: {selectedSeats.join(', ') || 'None'}</p>
        <h3>Total Bill: Rupees {selectedSeats.length * selectedFlight.price}</h3>
        <button onClick={handleCheckout} style={{ padding: '12px 24px', background: '#007bff', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: '5px', fontSize: '16px' }}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}