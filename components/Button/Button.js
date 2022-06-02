const Button = ({ type, text, children, disabled, onClick }) => {
  return (
    <>
      <button
        onClick={onClick}
        disabled={disabled}
        type={type}
        className="button"
      >
        {children}
        <span>{text}</span>
      </button>

      <style jsx>{`
        .button {
          display: flex;
          background-color: #fff;
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
          width: 100%;
        }

        .button:hover {
          background-color: aliceblue;
        }
      `}</style>
    </>
  );
};

export default Button;
