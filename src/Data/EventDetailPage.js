import React, { useEffect } from 'react'; // Added useEffect import
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../navigationbar/Navbar.js';
import { eventsData } from '../navigationbar/data.js';
import './EventDetail.css';

function EventDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Smooth scroll to top when component mounts or id changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [id]);

  const handleQuizClick = (e, topicId) => {
    e.stopPropagation(); // Prevent the parent div's click handler from firing
    navigate(`quiz`); // Use relative navigation
  };
  

  // Find the event with the matching id
  const event = eventsData.find(event => event.id === parseInt(id));
  
  // Handle case where event is not found
  if (!event) {
    return (
      <div className="event-detail-page">
        <Navbar />
        <div className="event-not-found">
          <h2>Event not found</h2>
          <button onClick={() => navigate('/')}>Return to Home</button>
        </div>
      </div>
    );
  }

  // Function to navigate to topic detail page
  const handleTopicClick = (topicId) => {
    navigate(`/event/${id}/topic/${topicId}`);
  };

  return (
    <div className="event-detail-page">
      <Navbar />
      
      <div className="event-detail-container">
        
        <div className="event-header">
        <button 
          className="back-button"
          onClick={() => navigate('/')}
        >
          ← 
        </button>
          <h1 className="event-title">{event.title}</h1>
          <div className="event-meta">
          </div>
        </div>
        
        <p className="event-description">{event.description}</p>
        
        {/* Topics Section */}
        <div className="topics-section">
          <h1>Topics</h1>
          <div className="topics-list">
            {event.topics.map(topic => (
              <div 
                key={topic.id} 
                className="topic-item"
                onClick={() => handleTopicClick(topic.id)}
              >
               <h3 className="topic-title">{topic.title}</h3>
               <div className='small'>
                <img 
                  src={topic.imageSrc} 
                  alt={topic.title} 
                  className="img1" 
                />
                  <p className="topic-description">{topic.description}</p>
                  <button className='quiz' onClick={(e) => handleQuizClick(e, topic.id)}>Take a Quiz</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetailPage;