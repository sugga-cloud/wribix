
const AnimatedHeading = ({ text, delayIncrement = 0.1, ...props }) => {
  const letters = text.split('');
  return (
    <h1 {...props}>
      {letters.map((char, index) => (
        <span
          key={index}
          className="highlight-letter"
          style={{ animationDelay: `${index * delayIncrement}s` }}
        >
          {char === ' ' ? '\u00A0' : char} {/* Use non-breaking space for actual spaces */}
        </span>
      ))}
    </h1>
  );
};

const HeroSection = ({ imageUrl, title, subtitle, imageAlt }) => {
  return (
    <section className="text-center mb-12 max-w-4xl mx-auto">
      <AnimatedHeading
        text={title}
        aria-label={title}
        className="text-white text-5xl font-extrabold leading-tight inline-block"
      />
      <p className="text-white text-sm mt-4 max-w-xl mx-auto">
        {subtitle}
      </p>
      <section className="max-w-7xl mx-auto px-4 mt-8">
        <img
          alt={imageAlt}
          className="w-full rounded-t-3xl object-cover animated-image h-[300px]" // Changed: Added h-[300px] and removed height="600" attribute
          src={imageUrl}
          // Removed width="1440" and height="600" attributes to rely on Tailwind classes for sizing
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://storage.googleapis.com/a1aa/image/709461d3-fdf5-4644-bad6-73a230660719.jpg"; // Updated placeholder size
          }}
        />
      </section>
    </section>
  );
};
export default HeroSection;