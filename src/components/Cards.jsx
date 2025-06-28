import React, { useState, useEffect } from 'react';

export default function App() {
  const cardData = [
    {
      heading: "Website Development",
      description: "Crafting stunning and responsive websites tailored to your business needs.",
      button: "Explore Web Solutions"
    },
    {
      heading: "Mobile App Development",
      description: "Building intuitive and high-performance mobile applications for iOS and Android.",
      button: "View Mobile Apps"
    },
    {
      heading: "Device Developments",
      description: "Innovating cutting-edge solutions for embedded systems and IoT devices.",
      button: "Explore IoT Innovations"
    },
    {
      heading: "Cloud Development",
      description: "Leveraging cloud technologies for scalable, secure, and robust applications.",
      button: "Cloud Services"
    },
    {
      heading: "Game Development",
      description: "Creating engaging and immersive gaming experiences across various platforms.",
      button: "Play Our Games"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 to-gray-900 p-6 font-sans antialiased text-white">
      {/* Main Heading with animated letters */}
      <h1 className="text-4xl sm:text-5xl font-bold text-center mb-10">
        {"Our Development Services".split('').map((char, i) => (
          <span
            key={i}
            className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-purple-500 animate-highlight"
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </h1>

      {/* Cards Container */}
      <div className="flex flex-wrap items-center justify-center gap-6 animate-fadeIn">
        {cardData.map((data, index) => (
          <ShootingStarCard
            key={index}
            headingText={data.heading}
            descriptionText={data.description}
            buttonText={data.button}
          />
        ))}
      </div>

      {/* Animation Keyframes */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out both;
        }

        @keyframes starFall {
          0% {
            transform: translate(0, 0);
            opacity: 1;
          }
          100% {
            transform: translate(var(--dx), var(--dy));
            opacity: 0;
          }
        }

        @keyframes highlight {
          0% {
            filter: brightness(100%);
          }
          50% {
            filter: brightness(140%);
          }
          100% {
            filter: brightness(100%);
          }
        }

        .animate-highlight {
          animation: highlight 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

function ShootingStarCard({ headingText, descriptionText, buttonText }) {
  const [isHovered, setIsHovered] = useState(false);
  const [stars, setStars] = useState([]);

  const generateStar = () => {
    const startEdge = Math.random();
    let startX, startY, endX, endY;

    if (startEdge < 0.25) {
      startX = Math.random() * 100;
      startY = -10;
      endX = startX + (Math.random() * 40 - 20);
      endY = 110;
    } else if (startEdge < 0.5) {
      startX = 110;
      startY = Math.random() * 100;
      endX = -10;
      endY = startY + (Math.random() * 40 - 20);
    } else {
      startX = -10;
      startY = Math.random() * 100;
      endX = 110;
      endY = startY + (Math.random() * 40 - 20);
    }

    return {
      id: Math.random(),
      startX,
      startY,
      endX,
      endY,
      duration: Math.random() * 1.5 + 1.5,
      delay: Math.random() * 0.5
    };
  };

  useEffect(() => {
    let intervalId;
    if (isHovered) {
      setStars([]);
      setTimeout(() => setStars([generateStar()]), 100);
      intervalId = setInterval(() => {
        setStars(prev => [...prev, generateStar()]);
      }, 500);
    } else {
      clearInterval(intervalId);
      setTimeout(() => setStars([]), 500);
    }
    return () => clearInterval(intervalId);
  }, [isHovered]);

  return (
    <div
      className="relative w-full max-w-sm p-6 rounded-3xl shadow-2xl overflow-hidden 
                 transition-transform duration-300 ease-in-out 
                 hover:scale-105 hover:shadow-purple-500/50 bg-gradient-to-tr from-purple-900 to-gray-800"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Shooting Stars */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute bg-white rounded-full"
            style={{
              width: '4px',
              height: '4px',
              left: `${star.startX}%`,
              top: `${star.startY}%`,
              '--dx': `${star.endX - star.startX}vw`,
              '--dy': `${star.endY - star.startY}vh`,
              animation: `starFall ${star.duration}s linear forwards ${star.delay}s`,
              boxShadow: '0 0 10px 5px rgba(255, 255, 255, 0.7)',
              background: 'radial-gradient(circle at center, white 0%, transparent 70%)'
            }}
          />
        ))}
      </div>

      {/* Card Content */}
      <div className="relative z-20 text-center">
        <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-500">
          {headingText}
        </h2>
        <p className="text-gray-200 text-base mb-6">
          {descriptionText}
        </p>
        <button className="bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold py-2 px-6 rounded-full shadow-lg hover:shadow-xl transition-transform hover:scale-105 duration-300">
          {buttonText}
        </button>
      </div>
    </div>
  );
}
