import React from 'react';

const About = () => {
  return (
    <div className="bg-black text-white min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-4">About us:</h1>

      <div className="mb-8">
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Our Story</h2>
          <p>We are two teenagers based in London who decided it would be funny to code an unnecessarily complicated website. Our journey began with a shared passion for technology and a desire to make our lives more difficult, with a project that goes beyond the necessary amounts of work.</p>
          <p>The idea of creating a website that is intentionally difficult to make (for two kids that is) yet not even that funny anymore, quickly became our mission. From intricate coding puzzles to literally wanting to restart the Union of Soviet Socialist Republics, we strive to keep our audience entertained while showcasing Pookie's Coding skills.</p>
          <p>Join us on this traumatizing experience, where coding meets yet more coding.</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Maxwell Slight and Co.</h2>
          <p>Meet Maxwell Slight and Co., the center of our website. What started as a seemingly dumb idea to deliver a gift to a friend has evolved into something even dumber.</p>
          <p>The concept, originally created on Christmas Eve of 2023, turned into a fully functioning website with the potential to become a new and exciting business venture.</p>
          <p>Explore the world of Maxwell Slight and Co., where every click unveils hours of Coding and a touch of terrible humor.</p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-2">Behind the Scenes</h2>
          <p>Get a glimpse into the making of our website:</p>
          <p>Countless hours of coding, testing, and refining went into crafting the intricate web pages you see. From late-night brainstorming sessions to overcoming unexpected challenges, our journey was filled with excitement and learning.</p>
          <p>We hope you enjoy exploring the website as much as we hated creating it. Stay tuned for future updates as we continue to add more layers to this annoying piece of crap. </p>
        </div>
      </div>
    </div>
  );
};

export default About;

