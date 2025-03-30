import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar.js';
import '../navigationbar/Homepage.css';
import { eventsData, newsData } from './data.js';

function HomePage() {
  const [showAllEvents, setShowAllEvents] = useState(false);
  const navigate = useNavigate();
  
  // Display only the first 4 events, or all if showAllEvents is true
  const displayedEvents = showAllEvents ? eventsData : eventsData.slice(0, 4);

  // Function to handle event button clicks
  const handleEventClick = (eventId) => {
    navigate(`/event/${eventId}`);
  };

  // Function to handle news item clicks (external links)
  const handleNewsClick = (externalLink) => {
    window.open(externalLink, '_blank');
  };

  return (
    <div className="history-page">
      <Navbar />
      
      {/* Header with logo and title */}
      <div className="quasar-header">
        <div className="logo-container">
          <img src="../Quasar.png" alt="Quasar Logo" className="quasar-logo" />
        </div>
        <h1 className="quasar-title">QUASAR</h1>
      </div>
      
      {/* Featured events grid */}
      <div className="events-grid">
        {displayedEvents.map((event) => (
          <div key={event.id} className="event-card">
            <img src={event.imageSrc} alt={event.title} className="event-image" />
            <button 
              className="event-button"
              onClick={() => handleEventClick(event.id)}
            >
              {event.title}
            </button>
          </div>
        ))}
      </div>
      
      {/* More button */}
      <div className="more-button-container">
        <button 
          className="more-button"
          onClick={() => setShowAllEvents(!showAllEvents)}
        >
          {showAllEvents ? "Show less" : "...more"}
        </button>
      </div>
      
      {/* News section */}
      <div className="news-section">
        <h2 className="news-heading">NEWS</h2>
        <hr className="news-divider" />
        
        {newsData.map(item => (
          <div 
            key={item.id} 
            className="news-item"
            onClick={() => handleNewsClick(item.externalLink)}
            style={{ cursor: 'pointer' }}
          >
            <div className="news-image-container">
              <img 
                src={item.imageSrc || "/api/placeholder/120/80"} 
                alt={item.title} 
                className="news-image" 
              />
            </div>
            <div className="news-content">
              <p className="news-title">{item.title}</p>
              <p className="news-date">{item.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;