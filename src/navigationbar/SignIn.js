import React, { useState } from 'react';
import './SignIn.css';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from './Navbar';

function SignIn() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Handle the form submission for sign in
  const handleSignIn = async (e) => {
    e.preventDefault();

    // Check if the user and password are entered
    if (!username || !password) {
      alert('Please fill in both username and password.');
      return;
    }

    // Make the API request to sign in
    const response = await fetch('http://194.163.142.249:12020/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (data?.result === true) {
      // Save user data in localStorage
      localStorage.setItem('user', JSON.stringify(data.user)); // Save user data

      // Redirect to the profile page after successful login
      navigate('/profile');
    } else {
      alert(`ERROR: ${data?.error?.detail}`);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="login-container">
        <h2>Sign In</h2>
        <form className="login-form" onSubmit={handleSignIn}>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="email-login" type="submit">
            Log In
          </button>
          <div>
            <p>Don't have an account?</p>
            <Link to="/signup">Create an account</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
