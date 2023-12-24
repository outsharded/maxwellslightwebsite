import React from 'react';

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4">Maxwell Slightly & Co</h1>
        <p className="text-sm">Supplying all your needs</p>
      </div>

      <div className="absolute bottom-0 right-0 text-gray-700 p-4">
        <p>Built by Pookie</p>
      </div>
    </main>
  );
}
