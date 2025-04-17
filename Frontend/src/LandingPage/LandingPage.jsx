import React from 'react';
import './LandingPage.css';
import ChatBot from '../ChatBot/ChatBot';

const LandingPage = () => {
  
  return (
    <div className="landing-page">
      <section className="temp">
      </section>
      <section className="chat-section">
        <ChatBot />
      </section>
    </div>
  );
};

export default LandingPage;
