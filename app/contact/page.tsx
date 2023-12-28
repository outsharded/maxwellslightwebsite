// pages/contact.tsx
import React from 'react';

const Contact: React.FC = () => {
  const email = 'maxwellslight.co@gmail.com';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Contact Page</h1>
      <p className="text-2xl m-2 font-semibold">
        Our email: <a href={`mailto:${email}`}>{email}</a>
      </p>
    </div>
  );
};

export default Contact;
