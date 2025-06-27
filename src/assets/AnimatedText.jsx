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
export default AnimatedHeading;