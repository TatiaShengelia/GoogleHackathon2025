import React from 'react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import DisplayContainer from "../components/DisplayContainer"

function Profile() {
  const navigate = useNavigate();

  // Handle user logout
  const handleLogout = () => {
    // Remove user data from localStorage
    localStorage.removeItem('user');

    // Navigate to the Sign In page
    navigate('/signin');
  };

  return (
    <div className="profile-container">
      <Navbar />
      <button onClick={handleLogout} className="logout-button">Log Out</button>
      <DisplayContainer />
    </div>
  );
}

export default Profile;