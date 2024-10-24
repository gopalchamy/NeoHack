import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.get('http://localhost:3001/users', {
        params: {
          username: credentials.username,
          password: credentials.password,
        },
      });
  
      const users = response.data;
  
      if (users.length > 0) {
        setIsLoggedIn(true); // Successful login
      } else {
        alert('Invalid username or password');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('An error occurred while logging in. Please try again.');
    }
  };
  
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          name="username"
          value={credentials.username}
          onChange={handleInputChange}
          placeholder="Username"
        />
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleInputChange}
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
      {isLoggedIn && <h2>Welcome, {credentials.username}!</h2>}
    </div>
  );
}

export default App;
