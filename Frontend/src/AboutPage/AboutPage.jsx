import React from 'react';
import './AboutPage.css';

const AboutPage = () => {
  return (
    <div className="about-page">
      <h2>About Logos Chatbot</h2>
      <p className="intro">
        Logos is a chatbot that users interact with to engage in a Socratic way of thinking. 
        It encourages critical reflection and highlights diverse teachings from various philosophers, 
        inviting users to explore wisdom from different eras and cultures. Whether you're looking for 
        thoughtful conversation or a unique learning experience, Logos Chatbot provides an innovative 
        platform to challenge your ideas and expand your perspective.
      </p>
      <div className="cards-container">
        <div className="card">
          <h3>Features</h3>
          <ul>
            <li>Intelligent Bot Interaction</li>
            <li>Scalable Checkpoints</li>
            <li>Secure User Login/Registration</li>
            <li>Open Source</li>
          </ul>
        </div>
        <div className="card">
          <h3>Our Mission</h3>
          <p>
          Our mission is to foster meaningful conversations and improve the way you interact with technology. 
          Through engaging dialogue, we aim to inspire a deeper understanding of philosophical ideas and promote lifelong learning.
          </p>
        </div>
        <div className="card">
          <h3>Contributers</h3>
          <p>
          <ul>
            <li>Michael Boemer</li>
            <li>Davyd Soroka</li>
            <li>Sam Kann</li>
          </ul>
          </p>
        </div>
        {/*add more cards as needed */}
      </div>
    </div>
  );
};

export default AboutPage;
