import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // // Uncomment if you want to redirect authenticated users away from the login page
  // useEffect(() => {
  //   const auth = localStorage.getItem('user');
  //   if (auth) {
  //     navigate('/');
  //   }
  // }, []);

  const navigateToSignup = () => {
    window.location.href = '/signup';
  };

  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent form from refreshing the page

    let result = await fetch("http://localhost:8001/login", {
      method: 'post',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',  // Include credentials in the request
    });

    result = await result.json();
    console.warn(result);
    localStorage.setItem("user", JSON.stringify(result.result));
    // localStorage.setItem("token", JSON.stringify(result.auth));
    navigate('/book'); // Redirect to home page
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label className='email-field' htmlFor="email">Email:</label>
          <input
            type="text"
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
          Don't have an account?
          <span onClick={navigateToSignup} style={{ cursor: 'pointer', textDecoration: 'underline', color: "purple", marginLeft: 10 }}>
            Sign up
          </span>
        </p>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
