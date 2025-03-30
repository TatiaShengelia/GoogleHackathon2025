import React, { useState } from 'react';
import './SignUp.css';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

function SignUp() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle the form submission for sign up
  const handleSignUp = async (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (!username || !email || !password) {
      alert('Please fill in all fields.');
      return;
    }

    // Make the API request to sign up the user
    const response = await fetch('http://194.163.142.249:12020/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();

    if (data?.result === true) {
      // After successful sign up, log the user in automatically
      localStorage.setItem('user', JSON.stringify(data.user)); // Save user data

      // Redirect to the profile page after successful sign up
      navigate('/profile');
    } else {
      alert(`ERROR: ${data?.error?.detail}`);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="signup-container">
        <h2>Sign Up</h2>
        <form className="signup-form" onSubmit={handleSignUp}>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Enter email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="email-signup" type="submit">
            Sign Up
          </button>
        </form>
        <div className="terms">
          By creating an account, you agree with our <a href="#">Terms & Conditions</a> and <a href="#">Privacy Statement</a>.
        </div>
      </div>
    </div>
  );
}

export default SignUp;
