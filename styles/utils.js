// Crear utilidades donde le pasemos un color y cambiarle la opacidad
export const addOpacityToColor = (color, opacity) => {
  // Creamos la opacidad en hexadecimal
  const opacityHex = Math.round(opacity * 255).toString(16);

  // Retornamos el color que le pasemos y los 2 últimos los calculamos con la constante de arriba
  return `${color}${opacityHex}`;
};
