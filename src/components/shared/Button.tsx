const Button = ({ text, onClick, isRounded, additionalClasses }) => {
  const baseClasses =
    "inline-flex items-center px-4 py-2 text-sm font-medium whitespace-nowrap text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700";
  const roundedClass = isRounded ? "rounded-sm" : "";
  // const activeClass = isActive ? "bg-blue-500 text-white" : "";
  return (
    <button
      type="button"
      className={`${baseClasses} ${roundedClass} ${additionalClasses}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
