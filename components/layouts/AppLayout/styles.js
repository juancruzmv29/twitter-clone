import css from "styled-jsx/css";
import { breakpoints, colors, fonts } from "../../../styles/theme";
import { addOpacityToColor } from "../../../styles/utils";

const backgroundColor = addOpacityToColor(colors.primary, 0.3);

// Exportamos los estilos que queramos que tenga AppLayout y utilizamos el css que importamos
// EXPORT GLOBAL
export const globalStyles = css.global`
  html,
  body {
    background-image: radial-gradient(${backgroundColor} 1px, #fdfdfd 1px),
      radial-gradient(${backgroundColor} 1px, #fdfdfd 1px);
    background-position: 0 0, 25px 25px;
    background-size: 50px 50px;
    padding: 0;
    margin: 0;
    font-family: ${fonts.base};
    color: ${colors.white};
  }
  * {
    box-sizing: border-box;
  }

  textarea,
  input {
    font-family: ${fonts.base};
  }
`;

// CSS PARA CADA PÁGINA
export default css`
  div {
    display: grid;
    height: 100vh;
    place-items: center;
  }

  main {
    background: #fff;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    position: relative;
    overflow-y: auto;
  }
`;
