import React from 'react';

const About = () => {
  return (
    <div className="bg-black text-white min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-4">About Page</h1>
      
      <div className="flex space-x-4">
        <div className="flex-1 mr-4">
          <h2 className="text-xl font-bold mb-2">Our Story</h2>
          <p>We are two teenagers from London who decided it would be funny to code an unnecessarily complicated website. Our journey began with a shared passion for technology and a desire to challenge ourselves with a project that goes beyond the ordinary.</p>
          <p>The idea of creating a website that is intentionally complex yet amusing quickly became our mission. From intricate coding puzzles to playful design elements, we strive to keep our audience entertained while showcasing our technical skills.</p>
          <p>Join us on this whimsical coding adventure, where complexity meets creativity!</p>
        </div>

        <div className="flex-1 mr-4">
          <h2 className="text-xl font-bold mb-2">Features</h2>
          <p>Explore the unique features of our website that set it apart:</p>
          <ul>
            <li>Complex coding challenges for enthusiasts</li>
            <li>Interactive and visually appealing design</li>
            <li>Regular updates with new surprises</li>
            <li>Community forums for sharing experiences</li>
          </ul>
          <p>Whether you're a coding prodigy or just looking for some digital amusement, our website has something for everyone.</p>
        </div>

        <div className="flex-1">
          <h2 className="text-xl font-bold mb-2">Behind the Scenes</h2>
          <p>Get a glimpse into the making of our website:</p>
          <p>Countless hours of coding, testing, and refining went into crafting the intricate web pages you see. From late-night brainstorming sessions to overcoming unexpected challenges, our journey was filled with excitement and learning.</p>
          <p>We hope you enjoy exploring the website as much as we enjoyed creating it. Stay tuned for future updates as we continue to add more layers to this digital masterpiece!</p>
        </div>
      </div>
    </div>
  );
};

export default About;
