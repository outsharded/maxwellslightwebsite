'use client';
// pages/dashboard.tsx

import React, { useState, useEffect } from 'react';
import mongoose from 'mongoose';

// MongoDB connection
const MONGODB_URI = 'your_mongodb_uri';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  const client = await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

  const db = client.connection.db;
  cachedDb = db;

  return db;
}

// User model
const userSchema = new mongoose.Schema({
  name: String,
  address: String,
  email: String,
  orders: [
    {
      address: String,
      contents: String,
      orderCreated: { type: Date, default: Date.now },
    },
  ],
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

// API route to fetch user data
export default async function handler(req, res) {
  try {
    const db = await connectToDatabase();
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Dashboard page
const Dashboard: React.FC = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/users');
      const data = await response.json();
      setUsers(data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>User Dashboard</h1>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Address: {user.address}</p>
          </li>
        ))}
      </ul>
      <button>Create New User</button>
    </div>
  );
};

export default Dashboard;
