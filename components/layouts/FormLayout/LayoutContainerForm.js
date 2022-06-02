import { Outlet } from "react";
import { colors } from "../../../styles/theme";

// CONTENEDOR PARA RUTA DE LOS FORMS
const FormLayoutContainer = () => {
  return (
    <>
      <div className="background">
        <div className="container">
          <Outlet />
        </div>
      </div>

      <style jsx>{`
        .background {
          background: ${colors.darkgray};
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .container {
          display: flex;
          flex-direction: column;
          width: 600px;
          min-height: 600px;
          border-radius: 15px;
          background-color: ${colors.black};
          padding: 0.7rem;
        }
      `}</style>
    </>
  );
};

export default FormLayoutContainer;
