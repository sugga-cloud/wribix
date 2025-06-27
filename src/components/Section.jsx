import React, { useState, useEffect, useRef } from 'react';


/**
 * AnimatedHeading Component
 * Wraps text to apply letter-by-letter fade-in animation with stagger.
 * It expects the necessary CSS (@keyframes fadeInUp and .heading span styles)
 * to be defined in a parent component's style tag or global CSS.
 *
 * @param {object} props - Component properties.
 * @param {string} props.text - The text content to animate.
 * @param {number} [props.delayIncrement=0.05] - The delay increment for each successive letter.
 * @param {string} [props.className] - Additional CSS classes to apply to the h1 element.
 * @param {object} [props.rest] - Any other HTML attributes for the h1 element.
 */
const AnimatedHeading = ({ text, delayIncrement = 0.05, className, ...rest }) => {
  const letters = text.split('');

  return (
    <h2 className={`heading ${className}`} {...rest}>
      {letters.map((char, index) => (
        <span key={index} style={{ '--i': index + 1, animationDelay: `${index * delayIncrement}s` }}>
          {char === ' ' ? '\u00A0' : char} {/* Use non-breaking space for actual spaces */}
        </span>
      ))}
    </h2>
  );
};

/**
 * HeroSection Component
 * Displays the main hero content including an animated title, subtitle, and a timeline.
 */
const HeroSection = () => {
  const headingText = "Explore Our Creative Work and Success Stories";
  const subtitleText = "Browse through a curated selection of our finest projects across industries. Each design showcases our commitment to innovation, strategy, and excellence to elevate brands and deliver measurable results that leave a lasting impression.";

  const timelineSteps = [
    {
      title: "Plan",
      description: "Defining goals, gathering requirements, and strategizing the project roadmap.",
      src: "https://storage.googleapis.com/a1aa/image/plan.jpg", // Placeholder for Plan
      alt: "Illustration of a team planning with a whiteboard and sticky notes.",
    },
    {
      title: "Build",
      description: "Developing and iterating on solutions, focusing on robust and scalable architecture.",
      src: "https://storage.googleapis.com/a1aa/image/build.jpg", // Placeholder for Build
      alt: "Illustration of a developer coding on a laptop.",
    },
    {
      title: "Deploy",
      description: "Launching and integrating the solution, ensuring seamless delivery and performance.",
      src: "https://storage.googleapis.com/a1aa/image/deploy.jpg", // Placeholder for Deploy
      alt: "Illustration of a rocket launch, symbolizing deployment.",
    },
  ];

  return (
    <section className="text-center mb-12 max-w-4xl mx-auto">
      <AnimatedHeading
        text={headingText}
        aria-label={headingText}
        className="text-3xl sm:text-4xl font-semibold leading-tight select-none"
      />
      <p className="fade-text mt-6 text-center text-slate-600 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed" style={{ animationDelay: '2.6s' }}>
        {subtitleText}
      </p>
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 relative z-10">
        {timelineSteps.map((step, index) => (
          <div key={index} className="flex flex-col items-center p-4 rounded-lg timeline-step">
            <img
              alt={step.alt}
              className="w-32 h-32 object-cover rounded-full mb-4 shadow-lg" // Adjust size and style as needed
              src={step.src}
              style={{ animationDelay: `${0.1 * index}s` }} // Staggered animation delay for images
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://placehold.co/128x128/8B5CF6/FFFFFF?text=${step.title}`; // Placeholder with purple background
              }}
            />
            <h3 className="text-xl font-semibold text-slate-800 mb-2">{step.title}</h3>
            <p className="text-sm text-slate-600">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};


/**
 * FallingStars Component
 * Creates and animates multiple falling star elements in the background.
 * It expects the necessary CSS (@keyframes fall and .star styles)
 * to be defined in a parent component's style tag or global CSS.
 */
const FallingStars = () => {
  const starsContainerRef = useRef(null);
  const starCount = 40;

  useEffect(() => {
    const starsContainer = starsContainerRef.current;
    if (!starsContainer) return;

    // Clear any existing stars before re-rendering
    starsContainer.innerHTML = '';

    const randomRange = (min, max) => Math.random() * (max - min) + min;

    for (let i = 0; i < starCount; i++) {
      const star = document.createElement("div");
      star.classList.add("star");
      const size = randomRange(2, 5);
      star.style.width = size + "px";
      star.style.height = size + "px";
      star.style.left = randomRange(0, 100) + "vw";
      star.style.top = randomRange(-20, 100) + "vh"; // Start from various points, including off-screen
      star.style.animationDuration = randomRange(5, 12) + "s";
      star.style.animationDelay = randomRange(0, 12) + "s";
      starsContainer.appendChild(star);
    }

    // Cleanup function to remove stars when component unmounts
    return () => {
      if (starsContainer) {
        starsContainer.innerHTML = '';
      }
    };
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <div ref={starsContainerRef} className="falling-stars fixed top-0 left-0 w-full h-full overflow-hidden z-0" aria-hidden="true"></div>
  );
};


/**
 * ShootingStar Component
 * Animates a single shooting star across the screen at random intervals.
 * It expects the necessary CSS (@keyframes shooting and .shooting-star-element styles)
 * to be defined in a parent component's style tag or global CSS.
 */
const ShootingStar = () => {
  const shootingStarRef = useRef(null);

  useEffect(() => {
    const shootingStar = shootingStarRef.current;
    if (!shootingStar) return;

    let timeoutId;

    const animateShootingStar = () => {
      // Random start position near top-left quadrant
      const startX = Math.random() * 30; // vw
      const startY = Math.random() * 30; // vh
      shootingStar.style.top = startY + "vh";
      shootingStar.style.left = startX + "vw";

      // Reset animation by clearing and re-applying
      shootingStar.style.animation = "none";
      void shootingStar.offsetWidth; // Trigger reflow
      shootingStar.style.animation = "shooting 1.2s ease-in-out forwards";

      // Schedule next shooting star between 3-7 seconds
      const nextTime = Math.random() * 4000 + 3000;
      timeoutId = setTimeout(animateShootingStar, nextTime);
    };

    // Start the first shooting star after an initial delay
    timeoutId = setTimeout(animateShootingStar, 2000);

    // Cleanup function to clear the timeout when component unmounts
    return () => {
      clearTimeout(timeoutId);
    };
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <div ref={shootingStarRef} className="shooting-star-element" aria-hidden="true"></div>
  );
};


// Main App component
const App = () => {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans relative overflow-x-hidden"> {/* Background white, text slate-900 */}
      {/* Global styles including Poppins font, and all keyframe animations */}
      <style>
        {`
          body {
            font-family: "Poppins", sans-serif;
          }

          /* Letter by letter fade-in animation for heading */
          .heading span {
            opacity: 0.6; /* Base opacity for visibility on white background */
            display: inline-block;
            color: #1e293b; /* slate-800 for base text color */
            animation: highlightAnim 1.5s ease infinite; /* Continuous highlight */
            animation-fill-mode: forwards;
          }
          /* Dynamically assign delays for up to 100 spans */
          .heading span:nth-child(n) {
            animation-delay: calc(0.05s * var(--i));
          }

          @keyframes fadeInUp { /* Kept for initial heading fade-in */
            0% {
              opacity: 0;
              transform: translateY(10px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes highlightAnim { /* Adjusted for continuous highlight on white background */
            0% {
              opacity: 0.6;
              color: #1e293b; /* Start from dark, visible color */
              transform: translateY(0);
            }
            50% {
              opacity: 1;
              color: #8B5CF6; /* Purple-500 for highlight */
              transform: translateY(-10%);
            }
            100% {
              opacity: 0.6;
              color: #1e293b; /* Return to dark, visible color */
              transform: translateY(0);
            }
          }

          /* Text fade-in animation */
          .fade-text {
            opacity: 0;
            animation: fadeInText 2s ease forwards;
            animation-delay: 2.6s;
          }
          @keyframes fadeInText {
            to {
              opacity: 1;
            }
          }

          /* Falling stars background */
          .star {
            position: absolute;
            background: #8B5CF6; /* Purple for stars */
            border-radius: 50%;
            opacity: 0.8;
            filter: drop-shadow(0 0 2px #8B5CF6); /* Purple glow */
            animation-name: fall;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
          }
          @keyframes fall {
            0% {
              transform: translateY(-10px);
              opacity: 0.8;
            }
            100% {
              transform: translateY(110vh);
              opacity: 0;
            }
          }

          /* Shooting star effect */
          .shooting-star-element {
            position: fixed;
            top: 0;
            left: 0;
            width: 100px;
            height: 2px;
            background: linear-gradient(
              90deg,
              #8B5CF6, /* Purple gradient */
              rgba(139, 92, 246, 0.6), /* Purple with opacity */
              rgba(139, 92, 246, 0)
            );
            border-radius: 9999px;
            filter: drop-shadow(0 0 6px #8B5CF6); /* Purple glow */
            opacity: 0;
            transform: translateX(0) translateY(0) rotate(45deg);
            animation-timing-function: ease-in-out;
            animation-fill-mode: forwards;
            pointer-events: none;
            z-index: 0;
          }

          @keyframes shooting {
            0% {
              opacity: 1;
              transform: translateX(0) translateY(0) rotate(45deg);
            }
            100% {
              opacity: 0;
              transform: translateX(120vw) translateY(120vh) rotate(45deg);
            }
          }

          /* Image pop-in animation for timeline steps */
          @keyframes timelineStepPopIn {
            0% { transform: translateY(10px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }
          .timeline-step img {
            animation: timelineStepPopIn 0.5s ease-out forwards;
            opacity: 0; /* Start hidden */
          }
        `}
      </style>

      {/* Background animations */}
      <FallingStars />
      <ShootingStar />

      {/* Main content wrapper */}
      <main className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        {/* Hero Section */}
        <HeroSection />
      </main>
    </div>
  );
};

export default App;