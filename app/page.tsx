import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-black text-white">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4">Maxwell Slight & Co</h1>
        <p className="text-sm">Supplying all your needs</p>
      </div>

      <div className="absolute top-0 right-0 mt-4 mr-4">
        <Link href="/login" passHref legacyBehavior>
          <a className="text-white">Login</a>
        </Link>
      </div>

      <div className="absolute bottom-0 right-0 text-gray-700 p-4">
        <p>Built by Pookie</p>
      </div>
    </main>
  );
}
