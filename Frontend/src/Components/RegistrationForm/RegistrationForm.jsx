//Registeration form component

import React, { useState } from "react";
import "./RegistrationForm.css";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { register } from "../../services/authService";

const RegistrationForm = ({ onFormSwitch }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    // Validate that passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      const result = await register({ username, email, password });
      console.log("Registration successful:", result);
      
      onFormSwitch();
    } catch (err) {
      console.error("Registration error:", err);
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="registration-wrapper">
      <form onSubmit={handleSubmit}>
        <h1>Create an Account</h1>
        {error && <p className="error">{error}</p>}


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
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FaEnvelope className="icon" />
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

        <div className="input-box">
          <input
            type="password"
            placeholder="Confirm Password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <FaLock className="icon" />
        </div>

        <button type="submit">Sign Up</button>

        <div className="login-link">
          <p>
            Already have an account?{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onFormSwitch();
              }}
            >
              Login
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
