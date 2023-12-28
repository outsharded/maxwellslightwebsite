'use client';
import React, { useState, useEffect } from 'react';

interface Order {
  address: string;
  contents: string;
  orderCreated: Date;
}

interface User {
  _id: string;
  name: string;
  address: string;
  email: string;
  orders: Order[];
}
// Dashboard component
const Dashboard: React.FC = () => {
  const [showUserInputs, setShowUserInputs] = useState(false);
  const [showOrderInputs, setShowOrderInputs] = useState(false);
  const [users, setUsers] = useState<User[]>([]); // State for user list
  const [newUserName, setNewUserName] = useState('');
  const [newUserAddress, setNewUserAddress] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');
  const [newOrderAddress, setNewOrderAddress] = useState('');
  const [newOrderContents, setNewOrderContents] = useState('');
  const [newOrderId, setNewOrderId] = useState('');


  useEffect(() => {
    // Simulate user being logged in
  
    // Fetch user data from the API
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/users', { cache: 'no-store' });
        const responseData = await response.json();
  
        // Assuming responseData is the entire response
        const userData = responseData?.product?.documents || [];
  
        setUsers(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
    // Fetch user data
    fetchUserData();
  }, []);

  const handleCreateUser = async () => {
    try {
      setShowUserInputs(true); // Show inputs when creating a new user
      const body = JSON.stringify({"name": newUserName, "address": newUserAddress, "email": newUserEmail,})
      const response = await fetch('/api/createUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      });

      if (response.ok) {
        const createdUser: User = await response.json();
        //setUsers((prevUsers) => (Array.isArray(prevUsers) ? [...prevUsers, createdUser] : [createdUser]));
        setNewUserName('');
        setNewUserAddress('');
        setNewUserEmail('');
        setSuccessMessage('User added successfully! Reload to update user list.');
      } else {
        console.error('Error creating user:', response.status);
      }
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleCreateOrder = async () => {
    try {
      // Check if a user is selected
      if (!selectedUserId) {
        console.error('No user selected');
        return;
      }
  
      const body = JSON.stringify({
        _id: selectedUserId,
        address: newOrderAddress,
        contents: newOrderContents,
      });
  
      const response = await fetch(`/api/createOrder`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      });
  
      if (response.ok) {
        // You may want to update the user's orders in the state if needed
        setSuccessMessage('Order created successfully!');
      } else {
        console.error('Error creating order:', response.status);
      }
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };
  return (
    <div style={{ background: 'black', color: 'white' }} className="flex flex-col h-screen p-4">
      {/* Create User Form */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Create New User</h2>
        <div className="flex items-center">
    <button
      className="bg-gray-500 text-white p-2 rounded"
      onClick={() => setShowUserInputs(!showUserInputs)}
    >
      New User
    </button>

      <button
        className="bg-gray-500 text-white p-2 rounded ml-2"
        onClick={() => setShowOrderInputs(!showOrderInputs)}
      >
        New Order
      </button>
    
  </div>

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
  
      {/* New Order Input Fields */}
      <div className="mb-4">

  <div className={`flex flex-col ${showOrderInputs ? '' : 'hidden'}`}>
    <input
      type="text"
      placeholder="Order Address"
      value={newOrderAddress}
      onChange={(e) => setNewOrderAddress(e.target.value)}
      className="mb-2 p-2 border border-gray-400 rounded text-black"
    />
    <input
      type="text"
      placeholder="Order Contents"
      value={newOrderContents}
      onChange={(e) => setNewOrderContents(e.target.value)}
      className="mb-2 p-2 border border-gray-400 rounded text-black"
    />
    <input
      type="text"
      placeholder="User's ID"
      value={newOrderId || selectedUserId}
      onChange={(e) => setNewOrderId(e.target.value)}
      className="mb-2 p-2 border border-gray-400 rounded text-black"
    />
    <button className="bg-gray-500 text-white p-2 rounded" onClick={handleCreateOrder}>
      Create Order
    </button>
  </div>
</div>

  
      <div className="flex items-start">
        {/* Left Side */}
        <ul className="flex-1 border-r border-gray-400 pr-2">
          {users.length > 0 ? (
            users.map((user, index) => (
              <li
                key={user._id}
                className={`p-2 ${index % 2 === 0 ? 'bg-gray-500' : ''}`}
                onClick={() => setSelectedUserId(user._id)}
              >
                <strong>Name:</strong> {user.name} | <strong>Email:</strong> {user.email} | <strong>Orders:</strong> {user.orders.length}
              </li>
            ))
          ) : (
            <p>No users available</p>
          )}
        </ul>
  
        {/* Divider Line with Spacing */}
        <div className="w-2 border-r border-gray-500 mx-2"></div>
  
        {/* Right Side */}
        <ul className="flex-1 border-gray-400 text-right pl-2">
        {selectedUserId ? (
          users
            .filter((user) => user._id === selectedUserId)
            .map((user) =>
              user.orders.map((order, index) => (
                <li key={index} className={`p-2 ${index % 2 === 0 ? 'bg-gray-500' : ''}`}>
                  <strong>Order Contents:</strong> {order.contents} | <strong>Order Address:</strong> {order.address}
                </li>
              ))
            )
        ) : (
          <p>No user selected</p>
        )}
      </ul>
    </div>
  
      {/* Display selected user ID */}
      {selectedUserId && (
        <div className="mt-4">
          <p>Selected User ID: {selectedUserId}</p>
        </div>
      )}
    </div>
  );
  
  
};

export default Dashboard;
