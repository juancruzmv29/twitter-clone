const ButtonBlack = ({ type, children, text }) => {
  return (
    <>
      <button type={type} className="button">
        {children}
        <span>{text}</span>
      </button>

      <style jsx>{`
        .button {
          display: flex;
          background-color: #000;
          align-items: center;
          justify-content: center;
          height: 2rem;
          cursor: pointer;
          text-align: center;
          border-radius: 50px;
          border: none;
          margin-bottom: 1rem;
          font-weight: 600;
          max-width: 18rem;
          transition: all 0.2s ease;
          padding: 1.1rem;
          color: dodgerblue;
          border: 1px slategray solid;
          font-weight: 700;
          font-size: 16px;
        }

        .button:hover {
          background-color: #212f3c;
        }
      `}</style>
    </>
  );
};

export default ButtonBlack;
