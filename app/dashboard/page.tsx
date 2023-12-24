'use client';
// pages/dashboard.tsx

// use client

import React, { useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  address: string;
  email: string;
  orders: Array<{
    address: string;
    contents: string;
    orderCreated: Date;
  }>;
}

// Dashboard component
const Dashboard: React.FC = () => {
  const [isLoggedIn, setLoggedIn] = useState(false); // Dummy state for login status
  const [users, setUsers] = useState<User[]>([]); // State for user list
  const [newUserName, setNewUserName] = useState('');
  const [newUserAddress, setNewUserAddress] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // Simulate user being logged in
    setLoggedIn(true);

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
        setUsers((prevUsers) => [...prevUsers, createdUser]);
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
      {/* User List */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Users</h2>
        <ul>
          {users.length === 0 ? (
            <p>Loading...</p>
          ) : (
            users.map((user) => (
              <li key={user.id} className="mb-2">
                {user.name}
              </li>
            ))
          )}
        </ul>
        <button className="mt-2 bg-gray-500 text-white p-2 rounded" onClick={() => alert('Create new user')}>
          New User
        </button>
      </div>

      {/* Create User Form */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Create New User</h2>
        <div className="flex flex-col">
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
        </div>
        {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
      </div>
    </div>
  );
};

export default Dashboard;

