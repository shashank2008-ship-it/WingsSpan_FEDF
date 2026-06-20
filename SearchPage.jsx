// src/pages/SearchPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { flightsData } from '../utils/flightsData';

export default function SearchPage({ setSelectedFlight }) {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const navigate = useNavigate();

  // Route option 1: Specific input query filter
  const handleSearch = (e) => {
    e.preventDefault();
    setHasSearched(true);
    
    const results = flightsData.filter(flight => 
      flight.from.toLowerCase() === from.trim().toLowerCase() &&
      flight.to.toLowerCase() === to.trim().toLowerCase() &&
      (date === '' || flight.date === date) // matches date if selected
    );
    
    setFilteredFlights(results);
  };

  // Route option 2: Discovery mechanism ("Show all available flights now")
  const handleShowAll = () => {
    setHasSearched(true);
    setFrom('');
    setTo('');
    setDate('');
    setFilteredFlights(flightsData); // Dumps the complete 15 flight list
  };

  const handleSelectFlight = (flight) => {
    setSelectedFlight(flight);
    navigate('/seats');
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto', color: '#fff' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>✈️ Find Your Flight</h2>
      
      {/* Search Input Card */}
      <div style={{ background: '#222', padding: '25px', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.3)' }}>
        <form onSubmit={handleSearch} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px', alignItems: 'end' }}>
          <label>
            From (Origin City):
            <input 
              type="text" 
              placeholder="e.g. Hyderabad" 
              value={from} 
              onChange={(e) => setFrom(e.target.value)}
              required={!hasSearched}
              style={{ width: '100%', padding: '10px', marginTop: '5px', color: '#000', borderRadius: '4px', border: 'none' }}
            />
          </label>
          <label>
            To (Destination City):
            <input 
              type="text" 
              placeholder="e.g. Delhi" 
              value={to} 
              onChange={(e) => setTo(e.target.value)}
              required={!hasSearched}
              style={{ width: '100%', padding: '10px', marginTop: '5px', color: '#000', borderRadius: '4px', border: 'none' }}
            />
          </label>
          <label>
            Departure Date:
            <input 
              type="date" 
              value={date} 
              onChange={(e) => setDate(e.target.value)}
              style={{ width: '100%', padding: '10px', marginTop: '5px', color: '#000', borderRadius: '4px', border: 'none' }}
            />
          </label>
          
          <button type="submit" style={{ gridColumn: '1 / span 2', padding: '12px', background: '#007bff', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: '4px', fontWeight: 'bold', fontSize: '15px' }}>
            Search Selected Route 🔍
          </button>
          
          <button type="button" onClick={handleShowAll} style={{ padding: '12px', background: '#17a2b8', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: '4px', fontWeight: 'bold', fontSize: '15px' }}>
            Show All Flights 🌐
          </button>
        </form>
      </div>

      {/* Flight Search Output Grid */}
      {hasSearched && (
        <div style={{ marginTop: '40px' }}>
          <h3>Available Schedules ({filteredFlights.length})</h3>
          {filteredFlights.length === 0 ? (
            <p style={{ color: '#aaa', background: '#222', padding: '20px', borderRadius: '5px' }}>No scheduled flights match your search queries.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {filteredFlights.map((flight) => (
                <div key={flight.id} style={{ background: '#222', padding: '20px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderLeft: '5px solid #007bff' }}>
                  <div>
                    <h4 style={{ margin: '0 0 5px 0', color: '#007bff' }}>{flight.airline} <span style={{ color: '#aaa', fontSize: '13px' }}>({flight.id})</span></h4>
                    <p style={{ margin: 0, fontSize: '15px' }}>
                      <strong>{flight.from}</strong> ➔ <strong>{flight.to}</strong>
                    </p>
                    <p style={{ margin: '5px 0 0 0', fontSize: '13px', color: '#aaa' }}>
                      📅 Date: {flight.date} | ⏰ Departs: {flight.departure}
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#28a745', marginBottom: '8px' }}>₹{flight.price}</div>
                    <button 
                      onClick={() => handleSelectFlight(flight)}
                      style={{ padding: '8px 15px', background: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                      Select Flight
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}