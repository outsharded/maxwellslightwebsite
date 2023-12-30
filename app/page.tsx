import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-black text-white">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4">Maxwell Slight & Co.</h1>
        <p className="text-sm">Supplying all your needs</p>
      </div>

      <div className="absolute top-0 right-0 m-4">
        <Link href="/shop" passHref legacyBehavior>
          <a className="text-white m-1">Shop</a>
        </Link>
        <Link href="/login" passHref legacyBehavior>
          <a className="text-white m-1">Login</a>
        </Link>
      </div>

      {/* Footer with 4 links */}
      <footer className="absolute bottom-0 right-0 text-gray-700 p-4 flex items-center">
  <Link href="/about" passHref legacyBehavior>
    <a className="text-gray-700 hover:text-white mx-2">About</a>
  </Link>
  <Link href="/contact" passHref legacyBehavior>
    <a className="text-gray-700 hover:text-white mx-2">Contact Us</a>
  </Link>
  <Link href="/shop" passHref legacyBehavior>
    <a className="text-gray-700 hover:text-white mx-2">Shop</a>
  </Link>

  <p className="ml-2">Built by Pookie </p>
</footer>

    </main>
  );
}
