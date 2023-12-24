'use client';
// pages/user-list.js

import { useEffect, useState } from 'react';

const UserListPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch data from the API endpoint
    const fetchData = async () => {
      try {
        const response = await fetch('/api/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>User List</h1>
      {users.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <pre>{JSON.stringify(users, null, 2)}</pre>
      )}
    </div>
  );
};

export default UserListPage;
