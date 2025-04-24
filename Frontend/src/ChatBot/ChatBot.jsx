//ChatBot.jsx
import React, { useState, useEffect, useCallback } from 'react';
import './ChatBot.css';

const ChatBot = () => {
  const [dialogId, setDialogId] = useState('dialog1');
  const [currentStepId, setCurrentStepId] = useState('start');
  const [chatStep, setChatStep] = useState(null);
  const [loading, setLoading] = useState(false);
  const [iq, setIq] = useState(0);
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";


  const dialogs = ['dialog1', 'dialog2', 'dialog3'];
  const stepsPerDialog = 12;
  const maxIQ = 200;
  const normalWeight = dialogs.length * stepsPerDialog - 1;
  const bonusWeight = dialogs.length * 2;
  const perStepIQ = maxIQ / (normalWeight + bonusWeight);
  const bonusIQ = perStepIQ * 2;

  const fetchChatStep = useCallback((stepId, choiceIndex) => {
    setLoading(true);
    
    const payload = {
      dialog_id: dialogId,
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
  }, [API_URL, dialogId]);

// Load initial chat step
  useEffect(() => {
    fetchChatStep('start');
  }, [fetchChatStep]);

  // Handle user clicking an option
  const handleOptionClick = (index) => {
    // Determine next step
    const nextStepId = chatStep.options[index].next;

    if (
      dialogId === 'dialog3' &&
      currentStepId === 'end' &&
      nextStepId === 'start'
    ) {
      // reset IQ and go back to dialog1 start
      setIq(0);
      setDialogId('dialog1');
      setCurrentStepId('start');
      fetchChatStep('start', null);
      return;
    }

    setIq(prev => {
      let updated = prev + perStepIQ;
      if (currentStepId === 'final') {
        updated += bonusIQ;
      }
      return Math.min(updated, maxIQ);
    });

    if (currentStepId === 'end') {
      const idx = dialogs.indexOf(dialogId);
      const nextDialog = dialogs[(idx + 1) % dialogs.length];
      setDialogId(nextDialog);
      setCurrentStepId('start');
      fetchChatStep('start', null);
    } else {
      setCurrentStepId(nextStepId);
      fetchChatStep(currentStepId, index);
    }

  };

  if (loading && !chatStep) {
    return <div>Loading chat...</div>;
  }

  if (!chatStep) {
    return <div>No chat available.</div>;
  }

  return (
    <div className="chatbot-container">
      {/* IQ Progress Bar */}
      <div className="iq-bar-container">
        <div className="iq-text">IQ: {Math.round(iq)}</div>
        <div className="iq-bar">
          <div
            className="iq-fill"
            style={{ width: `${(iq / maxIQ) * 100}%` }}
          />
        </div>
      </div>

      <div className="bot-message">{chatStep.bot}</div>

      {/* Option Buttons */}
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
