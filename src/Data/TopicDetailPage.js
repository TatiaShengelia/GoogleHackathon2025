import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Navbar from '../navigationbar/Navbar.js';
import { eventsData } from '../navigationbar/data.js';
import './TopicDetail.css';

function TopicDetailPage() {
  const { id, topicId } = useParams();
  const navigate = useNavigate();
  const [expandedSections, setExpandedSections] = useState({});
  const [expandedSubpoints, setExpandedSubpoints] = useState({});
  const [expandedRecommendations, setExpandedRecommendations] = useState(false);

  // Scroll to top and reset expanded states when topic changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setExpandedRecommendations(false);
    setExpandedSections({});
    setExpandedSubpoints({});
  }, [id, topicId]);

  // Find the event with the matching id
  const event = eventsData.find(event => event.id === parseInt(id));
  
  // Handle case where event is not found
  if (!event) {
    return (
      <div className="topic-detail-page">
        <Navbar />
        <div className="topic-not-found">
          <h2>Event not found</h2>
          <button onClick={() => navigate('/')}>Return to Home</button>
        </div>
      </div>
    );
  }
  
  // Find the topic with the matching id
  const topic = event.topics.find(topic => topic.id === topicId);
  
  // Handle case where topic is not found
  if (!topic) {
    return (
      <div className="topic-detail-page">
        <Navbar />
        <div className="topic-not-found">
          <h2>Topic not found</h2>
          <button onClick={() => navigate(`/event/${id}`)}>Return to Event</button>
        </div>
      </div>
    );
  }

  // Get recommended topics (all topics in the same event except the current one)
  const recommendedTopics = event.topics.filter(t => t.id !== topicId);

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const toggleSubpoint = (subpointId) => {
    setExpandedSubpoints(prev => ({
      ...prev,
      [subpointId]: !prev[subpointId]
    }));
  };

  const toggleRecommendations = () => {
    setExpandedRecommendations(prev => !prev);
  };

  return (
    <div className="topic-detail-page">
      <Navbar />
      
      <div className="topic-detail-container">
        <div className="navigation-links">
          <button 
            className="back-button"
            onClick={() => navigate(`/event/${id}`)}
          >
            ←  {event.title}
          </button>
        </div>
        
        <div className="topic-header">
          <h1 className="topic-title">{topic.title}</h1>
        </div>
        
        <div className="topic-content">
          <div className="topic-introduction">
            <p>{topic.description}</p>
          </div>
      
          <div className="topic-main-content">
            {/* Render content sections if they exist */}
            {topic.content && topic.content.map((section) => (
              <div key={section.id} className="content-section">
                <div 
                  className="section-header"
                  onClick={() => toggleSection(section.id)}
                >
                  <h2 className="section-title">
                    <span className="section-number">{section.id}.</span> {section.title}
                    <span className="toggle-icon">
                      {expandedSections[section.id] ? '−' : '+'}
                    </span>
                  </h2>
                </div>
                
                {expandedSections[section.id] && (
                  <div className="section-content-wrapper">
                    <div className="section-content-container">
                      <div className="section-text">
                        {section.description}
                      </div>
                      {section.imageSrc && (
                        <div className="section-image-container">
                          <img 
                            src={section.imageSrc} 
                            alt={section.title} 
                            className="section-image"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              console.error('Failed to load image:', section.imageSrc);
                            }}
                          />
                        </div>
                      )}
                    </div>
                    
                    {section.subpoints && section.subpoints.map((subpoint) => (
                      <div key={subpoint.id} className="subpoint">
                        <div 
                          className="subpoint-header"
                          onClick={() => toggleSubpoint(subpoint.id)}
                        >
                          <h3 className="subpoint-title">
                            <span className="subpoint-number">{section.id}.{subpoint.id.toString().split('.')[1]}</span> {subpoint.title}
                            <span className="toggle-icon">
                              {expandedSubpoints[subpoint.id] ? '−' : '+'}
                            </span>
                          </h3>
                        </div>
                        
                        {expandedSubpoints[subpoint.id] && (
                          <div className="subpoint-content">
                            <div className="subpoint-content-wrapper">
                              <div className="subpoint-text">
                                {subpoint.description}
                              </div>
                              {subpoint.imageSrc && (
                                <div className="subpoint-image-container">
                                  <img 
                                    src={subpoint.imageSrc} 
                                    alt={subpoint.title} 
                                    className="subpoint-image"
                                    onError={(e) => {
                                      e.target.style.display = 'none';
                                      console.error('Failed to load image:', subpoint.imageSrc);
                                    }}
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Recommendations Section */}
          {recommendedTopics.length > 0 && (
            <div className="content-section recommendations-section">
              <div 
                className="section-header"
                onClick={toggleRecommendations}
              >
                <h2 className="section-title">
                  Recommendations
                  <span className="toggle-icon">
                    {expandedRecommendations ? '−' : '+'}
                  </span>
                </h2>
              </div>
              
              {expandedRecommendations && (
                <div className="section-content-wrapper">
                  <div className="recommendations-list">
                    {recommendedTopics.map((recommendedTopic) => (
                      <Link 
                        key={recommendedTopic.id} 
                        to={`/event/${id}/topic/${recommendedTopic.id}`}
                        className="recommendation-link"
                      >
                        {recommendedTopic.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TopicDetailPage;