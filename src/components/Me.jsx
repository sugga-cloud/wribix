import React, { useEffect, useRef } from 'react';

// Place global styles outside the component to ensure they are loaded and applied correctly
// This mimics how styles would be included in the <head> of an HTML document
// or a global CSS file in a typical React setup.
const GlobalStyles = () => (
  <style>
    {`
      /* Importing Poppins font */
      @import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

      body {
        font-family: 'Poppins', sans-serif;
        overflow-x: hidden;
        background-color: #1a0e1f; /* Dark background */
        position: relative;
        min-height: 100vh;
        margin: 0;
      }

      /* General splash styling */
      .splash {
        position: absolute;
        border-radius: 50%;
        filter: blur(12px);
        mix-blend-mode: screen;
        pointer-events: none;
        transition: transform 0.1s ease-out;
        opacity: 0.15;
      }

      /* White splashes with different sizes and subtle float animation */
      .white-splash {
        background: white;
        opacity: 0.12;
        filter: blur(10px);
        animation: floatWhite 6s ease-in-out infinite;
      }
      @keyframes floatWhite {
        0%, 100% {
          transform: translateY(0);
          opacity: 0.12;
        }
        50% {
          transform: translateY(-15px);
          opacity: 0.25;
        }
      }

      /* Purple splashes that track cursor with different mobility */
      .purple-splash {
        background: #9b4dff; /* A vibrant purple */
        border-radius: 50%;
        pointer-events: none;
        filter: blur(14px);
        mix-blend-mode: screen;
        position: absolute;
        opacity: 0.2;
        transition: transform 0.1s ease-out; /* For smooth mouse tracking */
        z-index: 5;
      }

      /* Main content area styling */
      .main2 {
        position: relative;
        z-index: 10;
        padding-top: 5rem;
        padding-bottom: 5rem;
        max-width: 36rem;
        margin-left: auto;
        margin-right: auto;
        text-align: center;
      }

      /* Heading with letter-by-letter highlight effect (for MainContent h1) */
      .animated-highlight-heading span {
        opacity: 0.7; /* Base opacity */
        display: inline-block;
        color: white; /* Base color for text on dark background */
        animation: highlightPulse 2.5s ease infinite; /* Continuous highlight animation */
        animation-fill-mode: forwards;
      }

      @keyframes highlightPulse {
        0% {
          opacity: 0.7;
          color: white;
          transform: translateY(0);
        }
        50% {
          opacity: 1;
          color: #9b4dff; /* Purple highlight */
          transform: translateY(-5%); /* Subtle lift */
        }
        100% {
          opacity: 0.7;
          color: white;
          transform: translateY(0);
        }
      }
      /* Dynamically assign delays for letter-by-letter */
      .animated-highlight-heading span:nth-child(n) {
        animation-delay: calc(0.05s * var(--i));
      }


      /* Pricing Card Hover Highlight */
      .pricing-card-hover-effect {
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
      }
      .pricing-card-hover-effect:hover {
          border-color: #9b4dff; /* Highlight border with purple */
          box-shadow: 0px 0px 20px rgba(155, 77, 255, 0.4); /* Purple glow effect */
      }

    `}
  </style>
);


// Placeholder for DarkRoundedButton, as it was not provided in this HTML context.
// In your actual project, ensure this points to your real DarkRoundedButton component.
const DarkRoundedButton = ({ text, onClick, className, type = "button" }) => (
  <button
    type={type}
    onClick={onClick}
    className={`bg-pink-500 hover:bg-pink-600 text-black font-medium rounded-full px-8 py-3 transition-colors duration-300 ${className}`}
  >
    {text}
  </button>
);

// WhiteSplashes Component
const WhiteSplashes = () => {
  return (
    <>
      <div className="splash white-splash" style={{ width: '100px', height: '100px', top: '20%', left: '10%', animationDelay: '0s' }}></div>
      <div className="splash white-splash" style={{ width: '60px', height: '60px', top: '60%', left: '80%', animationDelay: '2s' }}></div>
      <div className="splash white-splash" style={{ width: '140px', height: '140px', top: '75%', left: '25%', animationDelay: '4s' }}></div>
    </>
  );
};

// PurpleSplashes Component
const PurpleSplashes = () => {
  const purple1Ref = useRef(null);
  const purple2Ref = useRef(null);
  const purple3Ref = useRef(null);

  // Different multipliers for layered parallax effect
  const multipliers = [0.15, 0.1, 0.06]; // Increased for a slightly more noticeable effect

  useEffect(() => {
    const purpleSplashes = [
      purple1Ref.current,
      purple2Ref.current,
      purple3Ref.current
    ];

    const handleMouseMove = (e) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const offsetX = e.clientX - centerX;
      const offsetY = e.clientY - centerY;

      purpleSplashes.forEach((splash, i) => {
        if (splash) {
          const moveX = offsetX * multipliers[i];
          const moveY = offsetY * multipliers[i];
          // Use CSS transforms relative to their initial centered position
          splash.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px))`;
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []); // Empty dependency array ensures this effect runs once on mount

  return (
    <>
      <div ref={purple1Ref} className="purple-splash" style={{ width: '220px', height: '220px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}></div>
      <div ref={purple2Ref} className="purple-splash" style={{ width: '140px', height: '140px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.15, filter: 'blur(10px)', zIndex: 4 }}></div>
      <div ref={purple3Ref} className="purple-splash" style={{ width: '90px', height: '90px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.12, filter: 'blur(8px)', zIndex: 3 }}></div>
    </>
  );
};

// MainContent Component
const MainContent = () => {
  const headingText = "Meet the Minds Behind the Magic";
  const letters = headingText.split('');

  return (
    <main className="main2">
      <img
        alt="Portrait of a man with glasses and curly hair, circular crop"
        className="rounded-full mb-6 mx-auto"
        height="80"
        src="https://storage.googleapis.com/a1aa/image/889a3ddb-c76e-4589-287f-fc52e2089bbd.jpg"
        width="80"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://placehold.co/80x80/9b4dff/FFFFFF?text=Avatar"; // Placeholder
        }}
      />
      <h1 className="animated-highlight-heading text-3xl sm:text-4xl font-semibold mb-3 leading-tight">
        {letters.map((char, index) => (
            <span key={index} style={{ '--i': index + 1 }}>
                {char === ' ' ? '\u00A0' : char}
            </span>
        ))}
      </h1>
      <p className="text-white text-sm sm:text-base mb-8">
        Get a free 30-minute strategy session with our lead designer.
      </p>
      <DarkRoundedButton
        text="Do a Free Call"
          onClick={() => {
                    window.location.href = 'tel:+919506060787'; // replace with your actual number
                  }}
        className="mb-14" // Add margin-bottom directly to the button
      />
      <p className="text-white text-sm mb-1">
        Prefer Email?
      </p>
      <a className="text-white font-semibold underline text-sm" href="mailto:chris@webrocket.studio">
        wribix@gmail.com
      </a>
    </main>
  );
};

// Main App component
const App = () => {
  return (
    <div className="relative min-h-screen font-sans overflow-x-hidden">
      {/* Global styles moved here */}
      <GlobalStyles />

      {/* Background elements */}
      <WhiteSplashes />
      <PurpleSplashes />

      {/* Main content of the page */}
      <MainContent />

   </div>
  );
};

export default App;
