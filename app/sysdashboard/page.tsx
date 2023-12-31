'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  _id: string;
  name: string;
  address: string;
  email: string;
}

interface Order {
  _id: string;
  userId: string;
  address: string;
  contents: string;
  status: number;
}

// Dashboard component
const Dashboard: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { push } = useRouter();
  const [showUserInputs, setShowUserInputs] = useState(false);
  const [showOrderInputs, setShowOrderInputs] = useState(false);
  const [users, setUsers] = useState<User[]>([]); // State for user list
  const [orders, setOrders] = useState<Order[]>([]); // State for user list
  const [newUserName, setNewUserName] = useState('');
  const [newUserPass, setNewUserPass] = useState('');
  const [newUserAddress, setNewUserAddress] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');
  const [selectedOrderId, setSelectedOrder] = useState('');
  const [newOrderAddress, setNewOrderAddress] = useState('');
  const [newOrderContents, setNewOrderContents] = useState('');
  const [newOrderId, setNewOrderId] = useState('');

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

    const fetchOrderData = async () => {
      try {
        const response = await fetch('/api/getOrders', { cache: 'no-store' });
        const responseData = await response.json();
  
        // Assuming responseData is the entire response
        const orderData = responseData?.product?.documents || [];
  
        setOrders(orderData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    useEffect(() => {
     // const authenticatedUser = localStorage.getItem('authenticatedUser');
  
     // if (authenticatedUser) {
        // If there is an authenticated user, set the state variable to true
      //  setIsLoggedIn(true);
     // } else {
        // If there is no authenticated user, navigate to the login page
       // push('/login');
      //}
      fetchUserData()
      fetchOrderData()
    }, []);
  

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
    await fetchOrderData();
  };

  const handleDeleteOrder = async () => {
    try {
      // Check if a user is selected
      if (!selectedOrderId) {
        console.error('No order selected');
        return;
      }
  
      const body = JSON.stringify({
        _id: selectedOrderId,
      });
  
      const response = await fetch(`/api/deleteOrder`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      });
  
  
    } catch (error) {
      console.error('Error deleting order:', error);
    }
    await fetchOrderData();
  };

  const bumpStatus = async () => {
    try {
      if (!selectedOrderId) {
        console.error('No order selected');
        return;
      }
      const currentStatus = orders.find(order => order._id === selectedOrderId)?.status||1
      const newStatus = (currentStatus === 4) ? 4 : (currentStatus + 1);

        const body = JSON.stringify({
          _id: selectedOrderId,
          status: newStatus
        });
      


  
      const response = await fetch(`/api/orderStatus`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      });

      if (response.ok) {
        // You may want to update the user's orders in the state if needed
        setSuccessMessage('Status bumped successfully!');
        await fetchOrderData();
      } else {
        console.error('Error bumping order:', response.status);
      }
    } catch(error) {
      console.error('Error bumping order:', error);
    }
  }

  const handleCreateUser = async () => {
    try {
      setShowUserInputs(true); // Show inputs when creating a new user
      const body = JSON.stringify({"name": newUserName, "address": newUserAddress, "email": newUserEmail, "pass": newUserPass,})
      const response = await fetch('/api/createUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      });

      if (response.ok) {
        const mailBody = JSON.stringify({"name": newUserName, "email": newUserEmail, "subject": "Added to our database", "message": "You have been added ",})
        const responseMail = await fetch('/api/newMail', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: mailBody,
        });
        setSuccessMessage('User added successfully! Reload to update user list.');   
        setNewUserName('');
        setNewUserAddress('');
        setNewUserEmail('');  
      } else {
        console.error('Error creating user:', response.status);
      }
    } catch (error) {
      console.error('Error creating user:', error);
    }
    await fetchUserData();
    
  };

  const handleDeleteUser = async () => {
    try {
      // Check if a user is selected
      if (!selectedUserId) {
        console.error('No user selected');
        return;
      }
  
      const body = JSON.stringify({
        _id: selectedUserId,
      });
  
      const response = await fetch(`/api/deleteUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      });
  
      if (response.ok) {
        // You may want to update the user's orders in the state if needed
        setSuccessMessage('User deleted successfully!');
        
      } else {
        console.error('Error deleting user:', response.status);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
    await fetchUserData();
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
    <button
      className="bg-gray-500 text-white p-2 rounded ml-2"
      onClick={() => handleDeleteUser()}
    >
      Delete Selected User
    </button> 
    <button
      className="bg-gray-500 text-white p-2 rounded ml-2"
      onClick={() => handleDeleteOrder()}
    >
      Delete Selected Order
    </button>
          {selectedOrderId && (
          <button className="bg-gray-500 text-white p-2 rounded ml-2" onClick={bumpStatus}>
          Bump Status
        </button>
        )}
    {successMessage && <p className="text-green-500 m-2">{successMessage}</p>}
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
          <input
            type="text"
            placeholder="Password"
            value={newUserPass}
            onChange={(e) => setNewUserPass(e.target.value)}
            className="mb-2 p-2 border border-gray-400 rounded text-black"
          />
          <button className="bg-gray-500 text-white p-2 rounded" onClick={handleCreateUser}>
            Create User
          </button>

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
  {selectedUserId && (
        <div className="m-2">
          <p>Selected User ID: {selectedUserId}</p>
        </div>
      )}
    {users.length > 0 ? (
      users.map((user, index) => (
        <li
          key={user._id}
          className={`p-2 ${selectedUserId === user._id ? 'bg-cyan-600' : ''} border-b border-gray-300`}
          onClick={() => setSelectedUserId(user._id)}
        >
          <strong>Name:</strong> {user.name} | <strong>Email:</strong> {user.email}
        </li>
      ))
    ) : (
      <p>No users available</p>
    )}
  </ul>

  {/* Divider Line with Spacing */}
  <div className="w-2 border-r border-gray-500"></div>

  {/* Right Side */}
  <ul className="flex-1 border-gray-400 text-right">
  {selectedOrderId && (
        <div className="m-2">
          <p>Selected Order ID: {selectedOrderId}</p>
        </div>
      )}
    {orders.length > 0 ? (
      orders
        .map((order) =>
          orders.map((order, index) => (
            <li
              key={index}
              className={`p-2 ${selectedOrderId === order._id ? 'bg-cyan-600' : ''} border-b border-gray-300`}
              onClick={() => setSelectedOrder(order._id)}
            >
              <strong>Contents:</strong> {order.contents} | <strong>Address:</strong> {order.address} | <strong>User:</strong> {users.find(user => user._id === order.userId)?.name || 'Unknown User'} | <strong>Status:</strong> {order.status}
            </li>
          ))
        )
    ) : (
      <p>No orders found</p>
    )}
  </ul>
</div>

      {/* Display selected user ID */}

    </div>
  );
  
  
};

export default Dashboard;
