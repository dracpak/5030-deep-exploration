import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import LoginForm from '../Components/LoginForm/LoginForm';
import RegistrationForm from '../Components/RegistrationForm/RegistrationForm';
import './Layout.css';

const Layout = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

    // Check localStorage to see if a token exists
    useEffect(() => {
      const token = localStorage.getItem("authToken");
      if (token) {
        setIsAuthenticated(true);
      }
    }, []);

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


  const closeForm = () => {
    setShowForm(false);
  };

    const handleLoginSuccess = (userData) => {
      setIsAuthenticated(true);
      setShowForm(false);
    };
  
    const handleLogout = () => {
      setIsAuthenticated(false);
      localStorage.removeItem("authToken");
      navigate("/");
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
            {!isAuthenticated ? (
              <>
                <button onClick={() => openForm('login')}>Login</button>
                <button onClick={() => openForm('register')}>Register</button>
              </>
            ) : (
              <button onClick={handleLogout}>Logout</button>
            )}
          </nav>
        </header>
        <main className="landing-main">
          <Outlet />
        </main>
        {showForm && (
          <div className="form-wrapper">
            {showLogin ? (
              <LoginForm onFormSwitch={handleFormSwitch} onLoginSuccess={handleLoginSuccess} />
            ) : (
              <RegistrationForm onFormSwitch={handleFormSwitch} />
            )}
            <button className="close-btn" onClick={closeForm}>
              Close
            </button>
          </div>
        )}
        <footer className="footer">
          <p>&copy; {new Date().getFullYear()} Logos Chatbot. All Rights Reserved.</p>
        </footer>
      </>
    );
};

export default Layout;
