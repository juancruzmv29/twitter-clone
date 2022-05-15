const Button = ({ colorBg, colorText, text, type }) => {
  // Variable para el color
  let classColorBg;
  let classColorText;

  // Distintas clases de botones segun el color
  if (colorBg === "white") {
    classColorBg =
      "bg-white-700 hover:bg-white-800 focus:outline-none focus:ring-4 focus:ring-white-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-white-600 dark:hover:bg-white-700 dark:focus:ring-white-800";
  }

  if (colorBg === "blue") {
    classColorBg =
      "bg-blue-400 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800";
  }

  if (colorBg === "black") {
    classColorBg =
      "bg-black-400 hover:bg-black-800 focus:outline-none focus:ring-4 focus:ring-black-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-black-600 dark:hover:bg-black-700 dark:focus:ring-black-800";
  }

  if (colorText === "white") {
    classColorBg = "text-black";
  }

  if (colorText === "black") {
    classColorText = "text-black";
  }

  if (colorText === "blue") {
    classColorText = "text-blue-400";
  }

  return (
    <button type={type} className={classColorBg + classColorText}>
      {text}
    </button>
  );
};

export default Button;
