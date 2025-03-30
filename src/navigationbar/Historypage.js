import React, { useState, useEffect, useRef } from 'react';
import Navbar from './Navbar.js';
import timelineData from '../timelinedata.js';
import '../navigationbar/Historypage.css';



function HomePage() {
  const [activeYear, setActiveYear] = useState(null);
  const timelineRef = useRef(null);
  const eventsRef = useRef([]);

  // Check which year is in view as user scrolls
  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;
      
      eventsRef.current.forEach((eventEl, index) => {
        if (!eventEl) return;
        
        const rect = eventEl.getBoundingClientRect();
        const elementMiddle = rect.top + rect.height / 2;
        
        if (elementMiddle > 0 && elementMiddle < window.innerHeight) {
          setActiveYear(timelineData[index].year);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="history-page">
      <Navbar />
      <div className="timeline-header">
        <div className="header-content">
          <img 
            src="../Quasar.png"
            alt="Timeline Logo" 
            className="timeline-logo" 
          />
          <div></div>
          <div></div>

          <h2>
            Welcome to the world of wonder,<div></div>
            where you can learn about all around you.
          </h2>
        </div>
      </div>
      
      <div className="timeline-container">
        <div className="timeline-content" ref={timelineRef}>
          <div className="timeline-line"></div>
          
          {timelineData.map((item, index) => (
            <div 
              key={item.year}
              ref={el => eventsRef.current[index] = el}
              className={`timeline-item ${activeYear === item.year ? 'active' : ''}`}
            >
              <div className="year-section">
                <div className={`year-label ${activeYear === item.year ? 'active' : ''}`}>
                  {item.year}
                </div>
                <div className={`timeline-point ${activeYear === item.year ? 'active' : ''}`}></div>
              </div>
              
              <div className="event-section">
                <div className="event-content">
                  {item.events.map((event, i) => (
                    <p key={i}>{event}</p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;