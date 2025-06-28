import React, { useState, useEffect } from 'react';

// Main App component that renders the ShootingStarCard
export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 to-gray-900 flex items-center justify-center p-4 font-sans antialiased">
      <ShootingStarCard />
    </div>
  );
}

// ShootingStarCard component
function ShootingStarCard() {
  const [isHovered, setIsHovered] = useState(false);
  const [stars, setStars] = useState([]);

  // Function to generate a random shooting star
  const generateStar = () => {
    // Determine a random starting position and direction
    const startEdge = Math.random(); // 0-0.25 top, 0.25-0.5 right, 0.5-0.75 bottom, 0.75-1 left
    let startX, startY, endX, endY;

    if (startEdge < 0.25) { // From top
      startX = Math.random() * 100;
      startY = -10;
      endX = startX + (Math.random() * 40 - 20); // Move slightly left/right
      endY = 110;
    } else if (startEdge < 0.5) { // From right
      startX = 110;
      startY = Math.random() * 100;
      endX = -10;
      endY = startY + (Math.random() * 40 - 20);
    } else if (startEdge < 0.75) { // From bottom (moving upwards)
      startX = Math.random() * 100;
      startY = 110;
      endX = startX + (Math.random() * 40 - 20);
      endY = -10;
    } else { // From left
      startX = -10;
      startY = Math.random() * 100;
      endX = 110;
      endY = startY + (Math.random() * 40 - 20);
    }

    // Random duration for animation
    const duration = Math.random() * 1.5 + 1.5; // 1.5 to 3 seconds
    const delay = Math.random() * 0.5; // Small delay for multiple stars

    return {
      id: Math.random(),
      startX,
      startY,
      endX,
      endY,
      duration,
      delay,
    };
  };

  // Effect to manage star generation on hover
  useEffect(() => {
    let intervalId;
    if (isHovered) {
      // Clear existing stars to avoid clutter from previous hovers
      setStars([]);
      // Generate stars with a slight delay to make them appear sequentially
      setTimeout(() => {
        setStars([generateStar()]);
      }, 100); // Initial star quickly
      intervalId = setInterval(() => {
        setStars((prevStars) => [...prevStars, generateStar()]);
      }, 500); // Generate a new star every 0.5 seconds while hovered
    } else {
      clearInterval(intervalId);
      // Remove stars after a short delay to allow current animations to finish
      setTimeout(() => {
        setStars([]);
      }, 500);
    }

    return () => clearInterval(intervalId); // Cleanup interval on unmount or hover end
  }, [isHovered]);

  return (
    <div
      className="relative w-full max-w-sm mx-auto p-6 rounded-3xl shadow-2xl overflow-hidden
                 transition-all duration-300 ease-in-out
                 hover:scale-105 hover:shadow-purple-500/50" // Updated shadow color
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        // Main background with radial glow and conic gradient for wave effect
        backgroundImage: `
            radial-gradient(circle at center, rgba(167, 139, 250, ${isHovered ? 0.15 : 0}) 0%, transparent 70%),
            conic-gradient(from 0deg at 50% 50%,
              #4c1d95 0%,         // Deep Purple (Tailwind purple-800)
              #dcdcdc 20%,        // Dark White
              #4c1d95 40%,
              #dcdcdc 60%,
              #4c1d95 80%,
              #dcdcdc 100%
            )
          `,
        backgroundSize: '250% 250%', // Make it larger to allow movement for wave effect
        backgroundPosition: isHovered ? '0% 0%' : '100% 100%', // Animate position for wave effect
        transition: 'background-position 1s ease-out, transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
      }}
    >
      {/* Shooting Stars Container */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {stars.map((star) => (
          <div
            key={star.id}
            className={`absolute rounded-full bg-white transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
            style={{
              width: '4px',
              height: '4px',
              left: `${star.startX}%`,
              top: `${star.startY}%`,
              // Calculate relative displacement for transform
              '--dx': `${star.endX - star.startX}vw`,
              '--dy': `${star.endY - star.startY}vh`,
              animation: `starFall ${star.duration}s linear forwards ${star.delay}s`,
              boxShadow: '0 0 10px 5px rgba(255, 255, 255, 0.7), 0 0 20px 10px rgba(167, 139, 250, 0.5)', // Purple glow for stars
              background: `radial-gradient(circle at center, white 0%, transparent 70%)`,
            }}
          />
        ))}
      </div>

      {/* Card Content */}
      <div className="relative z-20 text-center text-white">
        <h2 className="text-3xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-500">
          {"Cosmic Explorations".split('').map((char, index) => (
            <span
              key={index}
              style={{ animation: `waveText 2s ease-in-out infinite`, animationDelay: `${index * 0.05}s`, display: 'inline-block' }}
            >
              {char === ' ' ? '\u00A0' : char} {/* Preserve spaces */}
            </span>
          ))}
        </h2>
        <p className="text-gray-200 text-lg mb-6">
          Embark on a journey through the starlit skies and discover the wonders that lie beyond.
        </p>
        <button
          className="bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold py-3 px-8 rounded-full
                     shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out
                     focus:outline-none focus:ring-4 focus:ring-purple-300 focus:ring-opacity-75"
        >
          Unveil Mysteries
        </button>
      </div>

      {/* Keyframes for the shooting star and wavy text animation */}
      <style>{`
        @keyframes starFall {
          0% {
            transform: translate(0, 0);
            opacity: 1;
            box-shadow: 0 0 10px 5px rgba(255, 255, 255, 0.7);
          }
          100% {
            transform: translate(var(--dx), var(--dy)); /* Use the calculated displacement */
            opacity: 0;
            box-shadow: 0 0 5px 2px transparent; /* Fade out shadow */
          }
        }

        @keyframes waveText {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px); /* Adjust height of wave */
          }
        }
      `}</style>
    </div>
  );
}
