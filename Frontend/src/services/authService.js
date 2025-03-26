//authenticating the user and registering the user

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

// Function to log in a user
export const login = async ({ username, password }) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  
  if (!response.ok) {
    
    throw new Error("Login failed");
  }
  
  return response.json();
};

// Function to register a user
export const register = async ({ username, email, password }) => {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password }),
  });
  
  if (!response.ok) {
    throw new Error("Registration failed");
  }
  
  return response.json();
};
