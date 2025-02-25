//Login Form Component

import React, { useState } from "react";
import "./LoginForm.css";
import { FaUser, FaLock } from "react-icons/fa";
import { login } from "../../services/authService";

const LoginForm = ({ onFormSwitch }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);


  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    try {
      const result = await login({ username, password });
      console.log("Login successful:", result);
      // STILL TODO Handle successful login 
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid username or password.");
    }
  };

  
  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <h1>Logos Login</h1>

        <div className="input-box">
          <input
            type="text"
            placeholder="Username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <FaUser className="icon" />
        </div>
        
        <div className="input-box">
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FaLock className="icon" />
        </div>


        <div className="remember-forgot">
          <label>
            <input type="checkbox" />Remember Me
          </label>
          <a href="#">Forgot password?</a>
        </div>

        {error && <p className="error">{error}</p>}

        <button type="submit">Login</button>

        <div className="register-link">
          <p>
            Don't have an account?{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onFormSwitch();
              }}
            >
              Register here
            </a>
            
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
