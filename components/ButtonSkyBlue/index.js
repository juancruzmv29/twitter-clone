import { colors } from "../../styles/theme";

const ButtonSkyBlue = ({ type, text, children, disabled, onSubmit }) => {
  return (
    <>
      <button
        onSubmit={onSubmit}
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
          background-color: ${colors.skyblue};
          color: ${colors.white};
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
          background-color: #2678c5;
        }
      `}</style>
    </>
  );
};

export default ButtonSkyBlue;
