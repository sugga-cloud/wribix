const DarkRoundedButton = ({ text, onClick, style }) => (
  <button
    onClick={onClick}
    className={`rounded-full font-semibold focus:outline-none focus:ring-2 focus:ring-opacity-75 ${style}`}
  >
    {text}
  </button>
);

export default DarkRoundedButton;