import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [apod, setApod] = useState(null);
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const API_BASE = 'http://localhost:5000';

  const fetchApod = async (selectedDate = '') => {
    setLoading(true);
    setError('');
    let url = `${API_BASE}/api/nasa/apod`;
    if (selectedDate) {
      url += `?date=${selectedDate}`;
    }

    try {
      const res = await axios.get(url);
      setApod(res.data);
    } catch (err) {
      const msg = err.response?.data?.error || 'Could not fetch data. Try another date.';
      console.error("Frontend error:", msg);
      setError(msg);
      setApod(null);
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (e) => {
    const selected = e.target.value;
    setDate(selected);
    fetchApod(selected);
  };

  const getRandomDate = () => {
    const start = new Date(1995, 5, 16).getTime();
    const end = new Date().getTime();
    const randomTime = new Date(start + Math.random() * (end - start));
    return randomTime.toISOString().split('T')[0];
  };

  const handleRandomClick = () => {
    const randomDate = getRandomDate();
    setDate(randomDate);
    fetchApod(randomDate);
  };

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setDate(today);
    fetchApod(today);
  }, []);

  return (
    <div className="container">
      <h1>NASA Astronomy Picture of the Day</h1>
      <div className="controls">
        <input
          type="date"
          value={date}
          onChange={handleDateChange}
          max={new Date().toISOString().split('T')[0]}
        />
        <button onClick={handleRandomClick}>🎲 Random</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {apod && !loading && (
        <div className="apod">
          <h2>{apod.title}</h2>
          <p>{apod.date}</p>
          {apod.media_type === 'image' ? (
            <img src={apod.url} alt={apod.title} />
          ) : (
            <iframe
              title="NASA Video"
              src={apod.url}
              frameBorder="0"
              width="100%"
              height="400"
              allowFullScreen
            />
          )}
          <p className="description">{apod.explanation}</p>
        </div>
      )}
    </div>
  );
}

export default App;