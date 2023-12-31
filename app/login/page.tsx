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
    fetch('/api/checkPass', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Access-Control-Request-Headers': '*',
     //   'Cache-Control': 'no-store, max-age=0',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((res) => {
        console.log(res);
        // Handle the response here
        return res.json(); // Parse the JSON response
      })
      .then((data) => {
        if (data === "system") {
          window.location.href = '/sysdashboard';
        } else {
          // Handle other cases
          console.log('Handle other cases');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle errors here
      });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">;
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
  );
};

export default Login;
