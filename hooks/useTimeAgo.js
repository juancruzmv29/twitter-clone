import { useEffect, useState } from "react";

// Creamos una variable para ver si es compatible el DateTimeFormat
/*
    const isRelativeTimeFormatSupported = 
        typeod Intl !== "undefined" && Intl.RelativeTimeFormat
*/

// Creamos un array qe va a contener más arrays que dicen cuantos segunso tiene una hora, un dia etc
const DATE_UNITS = [
  ["day", 86400],
  ["hour", 3600],
  ["minute", 60],
  ["second", 1],
];

// Función para obtener la diferencia de la fecha de ahora
const getDateDiffs = (timestamp) => {
  // Obtenemos la fecha de ahora
  const now = Date.now();

  // El tiempo que ha pasado entre uno y otro va a ser ek timestamp menos el momento actual dividido 1000 asi que le quitamos los milisegundos. Entonces el elapsed va a ser el tiempo que paso. Sería el tiempo que paso menos el de ahora dividido 1000
  const elapsed = (timestamp - now) / 1000;

  // Averiguamos la distancia que hay entre estas 2 fechas, con un unit, y cuantos segundos hay en esa unidad
  for (const [unit, secondsInUnit] of DATE_UNITS) {
    // Aca vemos si es más grande el tiempo que ha pasado entre el momento actual y cuando se escribio el tweet o el número de segundos que hay en esa unidad o si la unidad es igual a segundos
    if (Math.abs(elapsed) > secondsInUnit || unit === "second") {
      // El valor va a ser el tiempo que ha pasado dividido entre los segundos que tiene esa unidad
      const value = Math.round(elapsed / secondsInUnit);
      return { value, unit };
    }
  }
};

// Hook para hace cuanto tiempo se hizo un tweet
export default function useTimeAgo(timestamp) {
  // Inicializamos el estado con la función getDateDiffs
  const [timeago, setTimeago] = useState(() => getDateDiffs(timestamp));

  // Efecto para que se actualice el tiempo que se ha hecho cada tweet por cada 5 segundos, cada vez que cambie el timestamp , este efecto solamente tendriamos hacerlo solo si es compatible con relativeTimeFormat
  useEffect(() => {
    const interval = setInterval(() => {
      const newTimeAgo = getDateDiffs(timestamp);
      // Actualizamos el estado de timeago con la constante de arriba que invoca a la función para obtener el tiempo que ha pasado
      setTimeago(newTimeAgo);
    });

    // Para desuscribirnos, limpiamos el intervalo
    return () => clearInterval(interval);
  }, [timestamp]);

  // Creamos el rtf, es la api del navegador para hacer estos tiempos relativos, le pasamos el idioma y le decimos que queremos la forma corta
  const rtf = new Intl.RelativeTimeFormat("es", { style: "short" });

  // Extraemos el value y la unidad de timeago
  const { value, unit } = timeago;

  // al rtf le aplicamos el método format que recibe dos parametros el value y la unidad de tiempo
  return rtf.format(value, unit);
}
