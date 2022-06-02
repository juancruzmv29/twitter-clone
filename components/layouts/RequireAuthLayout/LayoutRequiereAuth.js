import { Outlet } from "react";

// CONTENEDOR PARA RUTA PROTEGIDA
const RequireAuthLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default RequireAuthLayout;
