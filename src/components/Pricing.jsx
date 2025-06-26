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

      /* Main content area styling - Kept for general page structure if needed in future */
      main3 {
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


      /* Pricing Card Entrance Animation */
      @keyframes cardEntrance {
          0% {
              opacity: 0;
              transform: translateY(20px) scale(0.95);
          }
          100% {
              opacity: 1;
              transform: translateY(0) scale(1);
          }
      }
      .pricing-card-animation {
          opacity: 0; /* Start hidden */
          animation: cardEntrance 0.7s ease-out forwards;
      }

      /* Pricing Card Hover Highlight */
      .pricing-card-hover-effect {
          transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.2s ease-out;
      }
      .pricing-card-hover-effect:hover {
          border-color: #9b4dff; /* Highlight border with purple */
          box-shadow: 0px 0px 20px rgba(155, 77, 255, 0.4); /* Purple glow effect */
          transform: translateY(-5px); /* Lift card slightly on hover */
      }

      /* SVG Background Pulse Animation */
      @keyframes svgPulse {
        0%, 100% {
          opacity: 0.09;
          transform: scale(1);
        }
        50% {
          opacity: 0.15;
          transform: scale(1.05);
        }
      }
      .pricing-svg-animation {
        animation: svgPulse 4s ease-in-out infinite;
      }

      /* New: Pricing Section Heading Animation */
      .pricing-heading-animate span {
          display: inline-block;
          opacity: 0.7;
          color: white;
          animation: highlightPulse 2.5s ease infinite; /* Reusing highlightPulse */
          animation-fill-mode: forwards;
      }
      .pricing-heading-animate span:nth-child(n) {
          animation-delay: calc(0.05s * var(--i));
      }

      /* New: Pricing Card Price Animation */
      .pricing-price-animate span {
          display: inline-block;
          opacity: 0.7;
          color: #1f2937; /* Default dark text for price on white card */
          animation: priceHighlightPulse 2s ease infinite; /* Specific pulse for price */
          animation-fill-mode: forwards;
      }
      @keyframes priceHighlightPulse {
        0% {
          opacity: 0.7;
          color: #1f2937;
          transform: translateY(0);
        }
        50% {
          opacity: 1;
          color: #9b4dff; /* Purple highlight for price */
          transform: translateY(-5%);
        }
        100% {
          opacity: 0.7;
          color: #1f2937;
          transform: translateY(0);
        }
      }
      .pricing-price-animate span:nth-child(n) {
          animation-delay: calc(0.04s * var(--i)); /* Slightly faster stagger */
      }

      /* New: List Item Highlighting Animation */
      @keyframes listItemFadeInHighlight {
        0% {
          opacity: 0;
          transform: translateX(-10px);
          color: #9ca3af; /* Gray */
        }
        50% {
          opacity: 1;
          transform: translateX(0);
          color: #9b4dff; /* Purple highlight */
        }
        100% {
          opacity: 1;
          transform: translateX(0);
          color: #4b5563; /* Back to dark gray */
        }
      }
      .list-item-animate {
          opacity: 0; /* Start hidden */
          animation: listItemFadeInHighlight 1.5s ease forwards;
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

// MainContent Component (Removed from App render)
// Kept for reference but not rendered in App
/*
const MainContent = () => {
  const headingText = "Meet the Minds Behind the Magic";
  const letters = headingText.split('');

  return (
    <main>
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
        text="Book a Free Call"
        onClick={() => console.log('Book a Free Call button clicked!')}
        className="mb-14" // Add margin-bottom directly to the button
      />
      <p className="text-white text-sm mb-1">
        Prefer Email?
      </p>
      <a className="text-white font-semibold underline text-sm" href="mailto:chris@webrocket.studio">
        chris@webrocket.studio
      </a>
    </main>
  );
};
*/

const List = ({ children, index, cardIndex }) => { // Added index and cardIndex for staggered list animation
  return (
    <p
      className="text-base text-gray-600 list-item-animate"
      style={{ animationDelay: `${(cardIndex * 0.15 + 0.5) + (index * 0.1)}s` }} // Staggered animation based on card and list item index
    >
        <span className="mr-2 text-indigo-500"> {/* Checkmark color */}
            <i className="fas fa-check-circle"></i>
        </span>
        {children}
    </p>
  );
};

const PricingCard = ({
  children,
  description,
  price,
  type,
  subscription,
  buttonText,
  active,
  index // Added index prop for staggered animation
}) => {
  const priceLetters = price.split(''); // Split price for letter-by-letter animation

  return (
    <div className="w-full px-4 md:w-1/2 lg:w-1/3">
      <div
        className={`relative z-10 mb-10 overflow-hidden rounded-[10px] border-2 border-gray-300 bg-white px-8 py-10 shadow-lg sm:p-12 lg:px-6 lg:py-10 xl:p-[50px] pricing-card-hover-effect pricing-card-animation ${active ? 'border-indigo-500 shadow-xl' : ''}`}
        style={{ animationDelay: `${index * 0.15 + 0.5}s` }} // Staggered animation delay
      >
        <span className="mb-3 block text-lg font-semibold text-indigo-500"> {/* Replaced text-primary */}
          {type}
        </span>
        <h2 className="mb-5 text-[42px] font-bold text-gray-900 pricing-price-animate"> {/* Applied price animation class */}
          {priceLetters.map((char, i) => (
            <span key={i} style={{ '--i': i + 1 }}>
                {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
          <span className="text-base font-medium text-gray-600"> {/* Replaced text-body-color */}
            / {subscription}
          </span>
        </h2>
        <p className="mb-8 border-b border-gray-300 pb-8 text-base text-gray-600"> {/* Adjusted border/text color */}
          {description}
        </p>
        <div className="mb-9 flex flex-col gap-[14px]">
          {/* Pass index to List for staggered animation */}
          {React.Children.map(children, (child, i) =>
            React.cloneElement(child, { index: i, cardIndex: index })
          )}
        </div>
        <a
          href="/#"
          className={` ${
            active
              ? "block w-full rounded-md border border-indigo-500 bg-indigo-500 p-3 text-center text-base font-medium text-white transition hover:bg-opacity-90" // Adjusted colors
              : "block w-full rounded-md border border-gray-300 bg-transparent p-3 text-center text-base font-medium text-indigo-500 transition hover:border-indigo-500 hover:bg-indigo-500 hover:text-white" // Adjusted colors
          } `}
        >
          {buttonText}
        </a>
        <div>
          {/* Adjusted SVG colors to match purple theme or a consistent accent */}
          {/* Applied pricing-svg-animation class */}
          <span className="absolute right-0 top-7 z-[-1] pricing-svg-animation">
            <svg
              width={77}
              height={172}
              viewBox="0 0 77 172"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx={86} cy={86} r={86} fill="url(#paint0_linear)" />
              <defs>
                <linearGradient
                  id="paint0_linear"
                  x1={86}
                  y1={0}
                  x2={86}
                  y2={172}
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#9b4dff" stopOpacity="0.09" /> {/* Adjusted to purple */}
                  <stop offset={1} stopColor="#C4C4C4" stopOpacity={0} />
                </linearGradient>
              </defs>
            </svg>
          </span>
          <span className="absolute right-4 top-4 z-[-1] pricing-svg-animation" style={{ animationDelay: '0.2s' }}> {/* Staggered SVG animation */}
            <svg
              width={41}
              height={89}
              viewBox="0 0 41 89"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="38.9138"
                cy="87.4849"
                r="1.42021"
                transform="rotate(180 38.9138 87.4849)"
                fill="#9b4dff" // Adjusted to purple
              />
              <circle
                cx="38.9138"
                cy="74.9871"
                r="1.42021"
                transform="rotate(180 38.9138 74.9871)"
                fill="#9b4dff" // Adjusted to purple
              />
              <circle
                cx="38.9138"
                cy="62.4892"
                r="1.42021"
                transform="rotate(180 38.9138 62.4892)"
                fill="#9b4dff" // Adjusted to purple
              />
              <circle
                cx="38.9138"
                cy="38.3457"
                r="1.42021"
                transform="rotate(180 38.9138 38.3457)"
                fill="#9b4dff" // Adjusted to purple
              />
              <circle
                cx="38.9138"
                cy="13.634"
                r="1.42021"
                transform="rotate(180 38.9138 13.634)"
                fill="#9b4dff" // Adjusted to purple
              />
              <circle
                cx="38.9138"
                cy="50.2754"
                r="1.42021"
                transform="rotate(180 38.9138 50.2754)"
                fill="#9b4dff" // Adjusted to purple
              />
              <circle
                cx="38.9138"
                cy="26.1319"
                r="1.42021"
                transform="rotate(180 38.9138 26.1319)"
                fill="#9b4dff" // Adjusted to purple
              />
              <circle
                cx="38.9138"
                cy="1.42021"
                r="1.42021"
                transform="rotate(180 38.9138 1.42021)"
                fill="#9b4dff" // Adjusted to purple
              />
              <circle
                cx="26.4157"
                cy="87.4849"
                r="1.42021"
                transform="rotate(180 26.4157 87.4849)"
                fill="#9b4dff" // Adjusted to purple
              />
              <circle
                cx="26.4157"
                cy="74.9871"
                r="1.42021"
                transform="rotate(180 26.4157 74.9871)"
                fill="#9b4dff" // Adjusted to purple
              />
              <circle
                cx="26.4157"
                cy="62.4892"
                r="1.42021"
                transform="rotate(180 26.4157 62.4892)"
                fill="#9b4dff" // Adjusted to purple
              />
              <circle
                cx="26.4157"
                cy="38.3457"
                r="1.42021"
                transform="rotate(180 26.4157 38.3457)"
                fill="#9b4dff" // Adjusted to purple
              />
              <circle
                cx="26.4157"
                cy="13.634"
                r="1.42021"
                transform="rotate(180 26.4157 13.634)"
                fill="#9b4dff" // Adjusted to purple
              />
              <circle
                cx="26.4157"
                cy="50.2754"
                r="1.42021"
                transform="rotate(180 26.4157 50.2754)"
                fill="#9b4dff" // Adjusted to purple
              />
              <circle
                cx="26.4157"
                cy="26.1319"
                r="1.42021"
                transform="rotate(180 26.4157 26.1319)"
                fill="#9b4dff" // Adjusted to purple
              />
              <circle
                cx="26.4157"
                cy="1.4202"
                r="1.42021"
                transform="rotate(180 26.4157 1.4202)"
                fill="#9b4dff" // Adjusted to purple
              />
              <circle
                cx="13.9177"
                cy="87.4849"
                r="1.42021"
                transform="rotate(180 13.9177 87.4849)"
                fill="#9b4dff" // Adjusted to purple
              />
              <circle
                cx="13.9177"
                cy="74.9871"
                r="1.42021"
                transform="rotate(180 13.9177 74.9871)"
                fill="#9b4dff" // Adjusted to purple
              />
              <circle
                cx="13.9177"
                cy="62.4892"
                r="1.42021"
                transform="rotate(180 13.9177 62.4892)"
                fill="#9b4dff" // Adjusted to purple
              />
              <circle
                cx="13.9177"
                cy="38.3457"
                r="1.42021"
                transform="rotate(180 13.9177 38.3457)"
                fill="#9b4dff" // Adjusted to purple
              />
              <circle
                cx="13.9177"
                cy="13.634"
                r="1.42021"
                transform="rotate(180 13.9177 13.634)"
                fill="#9b4dff" // Adjusted to purple
              />
              <circle
                cx="13.9177"
                cy="50.2754"
                r="1.42021"
                transform="rotate(180 13.9177 50.2754)"
                fill="#9b4dff" // Adjusted to purple
              />
              <circle
                cx="13.9177"
                cy="26.1319"
                r="1.42021"
                transform="rotate(180 13.9177 26.1319)"
                fill="#9b4dff" // Adjusted to purple
              />
              <circle
                cx="13.9177"
                cy="1.42019"
                r="1.42021"
                transform="rotate(180 13.9177 1.42019)"
                fill="#9b4dff" // Adjusted to purple
              />
              <circle
                cx="1.41963"
                cy="87.4849"
                r="1.42021"
                transform="rotate(180 1.41963 87.4849)"
                fill="#9b4dff" // Adjusted to purple
              />
              <circle
                cx="1.41963"
                cy="74.9871"
                r="1.42021"
                transform="rotate(180 1.41963 74.9871)"
                fill="#9b4dff" // Adjusted to purple
              />
              <circle
                cx="1.41963"
                cy="62.4892"
                r="1.42021"
                transform="rotate(180 1.41963 62.4892)"
                fill="#9b4dff" // Adjusted to purple
              />
              <circle
                cx="1.41963"
                cy="38.3457"
                r="1.42021"
                transform="rotate(180 1.41963 38.3457)"
                fill="#9b4dff" // Adjusted to purple
              />
              <circle
                cx="1.41963"
                cy="13.634"
                r="1.42021"
                transform="rotate(180 1.41963 13.634)"
                fill="#9b4dff" // Adjusted to purple
              />
              <circle
                cx="1.41963"
                cy="50.2754"
                r="1.42021"
                transform="rotate(180 1.41963 50.2754)"
                fill="#9b4dff" // Adjusted to purple
              />
              <circle
                cx="1.41963"
                cy="26.1319"
                r="1.42021"
                transform="rotate(180 1.41963 26.1319)"
                fill="#9b4dff" // Adjusted to purple
              />
              <circle
                cx="1.41963"
                cy="1.4202"
                r="1.42021"
                transform="rotate(180 1.41963 1.4202)"
                fill="#9b4dff" // Adjusted to purple
              />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
};


const Pricing = () => {
  const headingText = "Our Pricing Plan";
  const letters = headingText.split('');

  return (
    <section className="relative z-10 overflow-hidden bg-[#1a0e1f] pb-12 pt-20 lg:pb-[90px] lg:pt-[120px]"> {/* Main section background matches body */}
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto mb-[60px] max-w-[510px] text-center">
              <span className="mb-2 block text-lg font-semibold text-indigo-400"> {/* Primary color */}
                Pricing Table
              </span>
              <h2 className="mb-3 text-3xl font-bold leading-[1.208] text-white sm:text-4xl md:text-[40px] pricing-heading-animate"> {/* Applied heading animation class */}
                {letters.map((char, index) => (
                    <span key={index} style={{ '--i': index + 1 }}>
                        {char === ' ' ? '\u00A0' : char}
                    </span>
                ))}
              </h2>
              <p className="text-base text-gray-400"> {/* Body color */}
                There are many variations of passages of Lorem Ipsum available
                but the majority have suffered alteration in some form.
              </p>
            </div>
          </div>
        </div>

        <div className="-mx-4 flex flex-wrap justify-center">
          {/* Map over pricing data to render cards with staggered animation */}
          {[{
            type: "Personal",
            price: "$59",
            subscription: "year",
            description: "Perfect for using in a personal website or a client project.",
            buttonText: "Choose Personal",
            lists: [
              "1 User",
              "All UI components",
              "Lifetime access",
              "Free updates",
              "Use on 1 (one) project",
              "3 Months support"
            ]
          },
          {
            type: "Business",
            price: "$199",
            subscription: "year",
            description: "Perfect for using in a personal website or a client project.",
            buttonText: "Choose Business",
            active: true,
            lists: [
              "5 User",
              "All UI components",
              "Lifetime access",
              "Free updates",
              "Use on 3 (Three) project",
              "4 Months support"
            ]
          },
          {
            type: "Professional",
            price: "$256",
            subscription: "year",
            description: "Perfect for using in a personal website or a client project.",
            buttonText: "Choose Professional",
            lists: [
              "Unlimited User",
              "All UI components",
              "Lifetime access",
              "Free updates",
              "Unlimited project",
              "12 Months support"
            ]
          }].map((cardData, index) => (
            <PricingCard
              key={index} // Use index as key, or a unique ID if available
              type={cardData.type}
              price={cardData.price}
              subscription={cardData.subscription}
              description={cardData.description}
              buttonText={cardData.buttonText}
              active={cardData.active}
              index={index} // Pass index for staggered animation
            >
              {cardData.lists.map((item, i) => (
                <List key={i} index={i} cardIndex={index}>{item}</List> // Pass index and cardIndex to List
              ))}
            </PricingCard>
          ))}
        </div>
      </div>
    </section>
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

      {/* Pricing Section - Added here */}
      <Pricing />

    </div>
  );
};

export default App;
