'use client';
// pages/dashboard.tsx

// use client

import React, { useState, useEffect } from 'react';

interface User {
  name: string;
  address: string;
  email: string;
}

// Dashboard component
const Dashboard: React.FC = () => {
  const [showUserInputs, setShowUserInputs] = useState(false);
  const [users, setUsers] = useState<User[]>([]); // State for user list
  var [newUserName, setNewUserName] = useState('');
  var [newUserAddress, setNewUserAddress] = useState('');
  var [newUserEmail, setNewUserEmail] = useState('');
  var [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // Simulate user being logged in

    // Fetch user data from the API
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/users');
        const data: User[] = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    // Fetch user data
    fetchUserData();
  }, []);

  const handleCreateUser = async () => {
    try {
      setShowUserInputs(true); // Show user inputs when creating a new user

      const response = await fetch('/api/createUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newUserName,
          address: newUserAddress,
          email: newUserEmail,
        }),
      });

      if (response.ok) {
        const createdUser: User = await response.json();
        setUsers((prevUsers) => (Array.isArray(prevUsers) ? [...prevUsers, createdUser] : [createdUser]));
        setNewUserName('');
        setNewUserAddress('');
        setNewUserEmail('');
        setSuccessMessage('User added successfully!');
      } else {
        console.error('Error creating user:', response.status);
      }
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <div style={{ background: 'black', color: 'white' }} className="flex flex-col h-screen p-4">
      {/* Create User Form */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Create New User</h2>
        <button
          className="bg-gray-500 text-white p-2 rounded"
          onClick={() => setShowUserInputs(!showUserInputs)}
        >
          New User
        </button>
        <div className={`flex flex-col ${showUserInputs ? '' : 'hidden'}`}>
          <input
            type="text"
            placeholder="Name"
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
            className="mb-2 p-2 border border-gray-400 rounded text-black"
          />
          <input
            type="text"
            placeholder="Address"
            value={newUserAddress}
            onChange={(e) => setNewUserAddress(e.target.value)}
            className="mb-2 p-2 border border-gray-400 rounded text-black"
          />
          <input
            type="text"
            placeholder="Email"
            value={newUserEmail}
            onChange={(e) => setNewUserEmail(e.target.value)}
            className="mb-2 p-2 border border-gray-400 rounded text-black"
          />
          <button className="bg-gray-500 text-white p-2 rounded" onClick={handleCreateUser}>
            Create User
          </button>
          {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
        </div>
      </div>

      {/* User List */}
      <div>
        <h2 className="text-lg font-semibold">Users</h2>

      </div>
    </div>
  );
};

export default Dashboard;
