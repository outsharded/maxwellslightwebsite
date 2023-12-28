// pages/about.js

import React from 'react';


const About = () => {
  return (
    <div className="bg-black text-white min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-4">About Page</h1>
      
      <div className="flex space-x-4">
        <div className="flex-1 mr-4">
          <h2 className="text-xl font-bold mb-2">Column 1</h2>
          <p>Content for column 1 goes here.</p>
        </div>

        <div className="flex-1 mr-4">
          <h2 className="text-xl font-bold mb-2">Column 2</h2>
          <p>Content for column 2 goes here.</p>
        </div>

        <div className="flex-1">
          <h2 className="text-xl font-bold mb-2">Column 3</h2>
          <p>Content for column 3 goes here.</p>
        </div>
      </div>
    </div>
  );
};

export default About;
