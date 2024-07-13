import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Nav = () => {
  const navigate = useNavigate();
  const auth = localStorage.getItem('user');
  let userName = '';

  if (auth) {
    try {
      const user = JSON.parse(auth);
      userName = user.username || ''; // Ensure it uses the correct key for the username
    } catch (e) {
      console.error('Failed to parse auth:', e);
    }
  }

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.clear();
    navigate('/signup');
  };

  return (
    <div>
      <img
        className="logo"
        src="https://static.vecteezy.com/system/resources/previews/024/149/115/original/book-learning-reading-pink-story-element-icon-vector.jpg"
        alt="Logo"
      />
      {auth ? (
        <ul className="nav-ul">
          <li><Link to="/book">Books</Link></li>
          <li><Link to="/add">Add Books</Link></li>
          <li><Link to="/update/:id">Update Books</Link></li>
          <li><Link to="/aboutus">AboutUs</Link></li>
          <li><Link to="/review">Feedback</Link></li>
          <li><Link to="/signup" onClick={handleLogout}>Logout </Link></li>
        </ul>
      ) : (
        <ul className="nav-ul nav-right">
          <li><Link to="/signup">Signup</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      )}
    </div>
  );
};

export default Nav;
