'use client';
// pages/login.tsx

import React, { useState } from 'react';
import { authenticateUser } from './authUtils';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    // Check if username and password are correct using the authentication function
    const isAuthenticated = authenticateUser({ username, password });

    if (isAuthenticated.stdUser) {
      localStorage.setItem('authenticatedUser', JSON.stringify({ username }));

      // Redirect to a new page (replace '/dashboard' with your desired page)
      window.location.href = '/sysdashboard';
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Login Page</h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-2 m-2 bg-white text-black"  /* Add style here */
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 m-2 bg-white text-black" /* Add style here */
          />
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 m-2 rounded" onClick={handleLogin}>
          Login
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
