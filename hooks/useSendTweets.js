import { addDevit, uploadImage } from "firebase/cliente";
import { UPLOADING_STATES } from "helpers/constants";
import throwError from "helpers/throwError";
import { useAuthUser } from "next-firebase-auth";
import { useRouter } from "next/router";
import useGlobalContext from "./useGlobalContext";

const useSendDevit = ({ file, message, setMessage }) => {
  const { devitStates, setDevitStates, setpopUp, popUp } = useGlobalContext();
  const { DONE, UPLOADING } = UPLOADING_STATES;

  const { push } = useRouter();
  const { photoURL, displayName, id } = useAuthUser();

  const devit = {
    avatar: photoURL,
    content: message.trim(),
    userId: id,
    username: displayName,
  };

  const handleSubmit = () => {
    // Entra en la fase carga para enviar el devit
    setDevitStates(UPLOADING);

    // Evalua si hay que subir el devit con una imagen o no
    // En este caso si NO hay imagen
    if (!file) {
      addDevit({
        ...devit,
        img: "No image",
      })
        .then(() => {
          if (!popUp) {
            setMessage("");
            setDevitStates(DONE);
            return;
          }
          push("/home");
          setMessage("");
          setpopUp(false);
          setDevitStates(DONE);
        })
        .catch((err) => {
          console.log(err);
          setDevitStates(DONE);
        });
      return; // creo que este return esta por las puras 🧐
    }

    /**
     * Me aseguro de obtener la url de la imagen que se va a adjuntar
     * en el devit. Para luego enviar esa url en la promesa, una vez
     * sea resuelta.
     */
    const iPromiseYouTheImage = new Promise((resolve) => {
      const tarea = uploadImage(file);
      tarea.on("state_changed", null, null, () => {
        tarea.snapshot.ref.getDownloadURL().then(resolve);
      });
    });

    /**
     * Luego, en el then con la url de la imagen ya disponible,
     * la añado al objeto para crear el devit y terminar de enviarlo
     */
    iPromiseYouTheImage
      .then((img) => {
        addDevit({
          ...devit,
          img,
        })
          .then(() => {
            if (!popUp) {
              setMessage("");
              setDevitStates(DONE);
              return;
            }
            push("/home");
            setMessage("");
            setpopUp(false);
            setDevitStates(DONE);
          })
          .catch((err) => {
            console.log(err);
            setDevitStates(DONE);
          });
      })
      .catch(() => throwError("Error al subir devit con imagen"));
  };

  const isButtonDisable =
    !message.length || devitStates === UPLOADING || message.length > 280;

  return { handleSubmit, isButtonDisable };
};

export default useSendDevit;
