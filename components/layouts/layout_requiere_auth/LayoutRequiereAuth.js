import { Outlet } from "react";

const LayoutRequiereAuth = (second) => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default LayoutRequiereAuth;
