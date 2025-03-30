import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../navigationbar/Navbar.css';

function Navbar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      
      // Define specific behavior:
      // 1. Always show navbar at the top of the page (when scrollPos < threshold)
      // 2. Hide when scrolling down
      // 3. Show when scrolling up
      const isAtTop = currentScrollPos < 10;
      const isScrollingDown = prevScrollPos < currentScrollPos;
      const isScrollingUp = prevScrollPos > currentScrollPos;
      
      if (isAtTop) {
        // Always show navbar at the top
        setVisible(true);
      } else if (isScrollingDown) {
        // Hide when scrolling down
        setVisible(false);
      } else if (isScrollingUp) {
        // Show when scrolling up
        setVisible(true);
      }
      
      setPrevScrollPos(currentScrollPos);
    };
    
    // Add throttling to prevent too many events
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', onScroll);
    
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [prevScrollPos]);
  
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (onSearch && typeof onSearch === 'function') {
      onSearch(query);
    }
  };

  return (
    <nav className={`navbar ${visible ? 'navbar-visible' : 'navbar-hidden'}`}>
      <div className="navbar-left">
        <Link to="/" className="logo">
          <img 
            src={process.env.PUBLIC_URL + '/Quasar.png'} 
            alt="Logo" 
            className="logo-image" 
          />
        </Link>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
      <div className="navbar-right">
        <Link to="/simulations">Simulations</Link>
        <Link to="/community">Community</Link>
        <Link to="/history">History</Link>

        {/* Conditional rendering based on login status */}
        {isLoggedIn ? (
          <Link to="/profile" className="profile-link">Profile</Link>
        ) : (
          <>
            <Link to="/signin" className="auth-link">Sign In</Link>
            <Link to="/signup" className="auth-link">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;