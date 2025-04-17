//ChatBot.jsx
import React, { useState, useEffect, useCallback } from 'react';
import './ChatBot.css';

const ChatBot = () => {
  const [chatStep, setChatStep] = useState(null);
  const [currentStepId, setCurrentStepId] = useState("start");
  const [loading, setLoading] = useState(false);
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  // Fetches the chat step from the server
  const fetchChatStep = useCallback((stepId, choiceIndex) => {
    setLoading(true);
    const payload = {
      step_id: stepId,
      choice_index: choiceIndex ?? -1
    };

    fetch(`${API_URL}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(res => {
        if (!res.ok) throw new Error(`Error ${res.status}`);
        return res.json();
      })
      .then(data => {
        setChatStep(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [API_URL]);

  // Load initial chat step
  useEffect(() => {
    fetchChatStep("start");
  }, [fetchChatStep]);

  // Handle user clicking an option
  const handleOptionClick = (index) => {
    const nextStep = chatStep.options[index].next;
    fetchChatStep(currentStepId, index);
    setCurrentStepId(nextStep);
  };

  if (loading && !chatStep) {
    return <div>Loading chat...</div>;
  }

  if (!chatStep) {
    return <div>No chat available.</div>;
  }

  return (
    <div className="chatbot-container">
      <div className="bot-message">{chatStep.bot}</div>
      <div className="options">
        {chatStep.options.map((option, idx) => (
          <button key={idx} onClick={() => handleOptionClick(idx)} disabled={loading}>
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChatBot;
