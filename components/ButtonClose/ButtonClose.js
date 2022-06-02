import * as React from "react";

export default function ButtonClose(props) {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      className="btn-cerrar"
      height={30}
      width={30}
      {...props}
    >
      <path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path>
    </svg>
  );
}
