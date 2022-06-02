import { useRef, useCallback, useEffect, useState } from "react";

/**
 * Hook para obtener información del viewport
 */
const useResizeObserver = () => {
  // Iniciamos el valor con el ancho y el alto
  const [size, setSize] = useState({ width: 0, height: 0 });
  // usamos la referencia nula
  const resizeObserver = useRef(null);

  // Función para el viewport, le pasamos las entries
  const onResize = useCallback((entries) => {
    //
    const { width, height } = entries[0].contentRect;
    setSize({ width, height });
  }, []);

  // Funcion para el ref, va a hacer un useCallback que recibe node y si el node no es null
  const ref = useCallback(
    (node) => {
      if (node !== null) {
        // Si hay resizeObserver actual, lo desconectamos
        if (resizeObserver.current) {
          resizeObserver.current.disconnect();
        }
        // Si no, creamos un nuevo ResizeObserver
        resizeObserver.current = new ResizeObserver(onResize);
        // Al observer le pasamos el node
        resizeObserver.current.observe(node);
      }
    },
    [onResize]
  );

  // Efecto para cuando se desconecte el viweport actual, se va a ejecutar una vez
  useEffect(
    () => () => {
      resizeObserver.current.disconnect();
    },
    []
  );

  return { ref, width: size.width, height: size.height };
};

export default useResizeObserver;
