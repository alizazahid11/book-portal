import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // useEffect(() => {
  //   const auth = localStorage.getItem('user');
  //   if (auth) {
  //     navigate('/');
  //   }
  // }, []);

  const navigateToLogin = () => {
    window.location.href = '/login';
  };

 const collectData = async (event) => {
  event.preventDefault();
  let result = await fetch("http://localhost:8001/signup", {
    method: 'post',
    body: JSON.stringify({ username, email, password }),
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',  // Include credentials in the request
  });

  result = await result.json();
  console.warn(result);
  
  // Assuming the response contains user data including username
  localStorage.setItem("user", JSON.stringify(result.user)); // Store user object

  navigate('/book'); 
};


  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={collectData}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className='signup-email' htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <p className='link'>
          Already have an account?
          <span onClick={navigateToLogin} style={{ cursor: 'pointer', textDecoration: 'underline', color: "purple", marginLeft: 10 }}>
            Login
          </span>
        </p>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
