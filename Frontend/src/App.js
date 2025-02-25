import React, { useState } from 'react';
import LoginForm from './Components/LoginForm/LoginForm';
import RegistrationForm from './Components/RegistrationForm/RegistrationForm';

function App() {
  const [showLogin, setShowLogin] = useState(true);

  // The App component renders the LoginForm or RegistrationForm based on the value of the showLogin state
  return (
    <div>
      {showLogin ? (
        <LoginForm onFormSwitch={() => setShowLogin(false)} />
      ) : (
        <RegistrationForm onFormSwitch={() => setShowLogin(true)} />
      )}
    </div>
  );
}

export default App;