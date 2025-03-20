import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import LoginForm from '../Components/LoginForm/LoginForm';
import RegistrationForm from '../Components/RegistrationForm/RegistrationForm';
import './Layout.css';

const Layout = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [showForm, setShowForm] = useState(false);

  // Toggle between the login and registration forms
  const handleFormSwitch = () => {
    setShowLogin(!showLogin);
  };


  const openForm = (formType) => {
    if (formType === 'login') {
      setShowLogin(true);
    } else {
      setShowLogin(false);
    }
    setShowForm(true);
  };

  // Close the form modal
  const closeForm = () => {
    setShowForm(false);
  };

  return (
    <>
      <header className="landing-header">
        <div className="logo">
          <h1>Logos Chatbot</h1>
        </div>
        <nav className="nav-links">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
            Home
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')}>
            About
          </NavLink>
          <button onClick={() => openForm('login')}>Login</button>
          <button onClick={() => openForm('register')}>Register</button>
        </nav>
      </header>
      <main className="landing-main">
        <Outlet />
      </main>
      {showForm && (
        <div className="form-wrapper">
          {showLogin ? (
            <LoginForm onFormSwitch={handleFormSwitch} />
          ) : (
            <RegistrationForm onFormSwitch={handleFormSwitch} />
          )}
          <button className="close-btn" onClick={closeForm}>
            Close
          </button>
        </div>
      )}
    </>
  );
};

export default Layout;
