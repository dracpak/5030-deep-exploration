import React from 'react';
import './AboutPage.css';

const AboutPage = () => {
  return (
    <div className="about-page">
      <h2>About Logos Chatbot</h2>

      <section id="socratic-section" className="socratic-intro">
        <h3>Socratic Method</h3>
        <p>
          Socratic thinking is an ancient method of dialogue that uses carefully crafted questions to stimulate critical
          reflection, uncover assumptions, and guide participants toward deeper understanding. Rather than lecturing or
          presenting conclusions, it invites you to interrogate your own beliefs, explore the reasoning behind them,
          and recognize areas of uncertainty.
        </p>
        <p>
          Our chatflow embodies this approach by structuring each conversation as a branching series of open-ended questions.
          At each step, the bot poses a thought-provoking prompt and offers two plausible responses. Your choice then leads
          to another question that digs deeper into the rationale behind that stance. This mirrors the Socratic goal: not to
          impose dogma, but to foster self-directed insight through structured inquiry.
        </p>
        <ul>
          <li>Open-ended questions that probe assumptions</li>
          <li>Branching dialogue to challenge and refine ideas</li>
          <li>Empowers you to discover insights rather than receive answers</li>
        </ul>
      </section>

      <div className="cards-container">
        <div className="card">
          <h3>Future Improvements</h3>
          <ul>
            <li>Improved Chat Flow</li>
            <li>Save Checkpoints</li>
            <li>Achivement and Statistics</li>
          </ul>
        </div>
        <div className="card">
          <h3>Our Mission</h3>
          <p>
            Our mission is to foster meaningful conversations and improve the way you interact with technology. Through
            engaging dialogue, we aim to inspire a deeper understanding of philosophical ideas and promote lifelong learning.
          </p>
        </div>
        <div className="card">
          <h3>Contributors</h3>
          <ul>
            <li>Michael Boemer</li>
            <li>Davyd Soroka</li>
            <li>Sam Kann</li>
          </ul>
        </div>
        {/* add more cards as needed */}
      </div>
    </div>
  );
};

export default AboutPage;
