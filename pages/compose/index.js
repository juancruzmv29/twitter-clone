import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserProvider";
import { addData, useFirestore } from "../../hooks/useFirestore";
import Head from "next/head";
import Image from "next/image";
import { colors } from "../../styles/theme";
import ButtonSkyBlue from "../../components/ButtonSkyBlue";

// Estado del tweet
const COMPOSE_STATES = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1,
};

// Estado del drag and drop
const DRAG_IMAGE_STATES = {
  ERROR: -1,
  NONE: 0,
  DRAG_OVER: 1,
  UPLOADING: 2,
  COMPLETE: 3,
};

// Componente para escribir un tweet
export default function Compose() {
  // Estado para el message
  const [message, setMessage] = useState("");
  // Estado para el status
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN);
  // Estado para el user
  const { user } = useContext(UserContext);
  // Estado para la tarea
  const [task, setTask] = useState(null);
  // Estado para la img cuando subimos
  const [imgURL, setImgURL] = useState(null);
  // Estado para cuando largamos la img
  const [drag, setDrag] = useState(DRAG_IMAGE_STATES.NONE);
  // useRouter
  const router = useRouter();

  const { addData } = useFirestore();

  // Efecto para cuando cambie la tarea/task
  useEffect(() => {
    // Si hay alguna tarea se va a ejecutar esto
    if (task) {
      // Se ejecuta cuando esta en progreso
      let onProgress = () => {
        setStatus(DRAG_IMAGE_STATES.UPLOADING);
      };
      // Se ejecuta cuando hay un error
      let onError = () => {
        setStatus(DRAG_IMAGE_STATES.ERROR);
      };
      // Se ejecuta cuando se termina de cargar
      let onComplete = () => {
        setStatus(DRAG_IMAGE_STATES.COMPLETE);
        task.snapshot.ref.getDownloadURL().then((imgURL) => setImgURL);
      };

      task.on("state_changed", onProgress, onError, onComplete);
    }
  }, [task]);

  // Para cambiar el handleChange del textarea
  const handleChange = (e) => {
    const { value } = e.target;
    setMessage(value);
  };

  // Funcion para cuando enviamos el tweet
  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus(COMPOSE_STATES.LOADING);
    addData({
      avatar: user.avatar,
      content: message,
      img: imgURL,
      userId: user.uid,
      userName: user.username,
    })
      .then(() => {
        router.push("/home");
      })
      .catch((error) => {
        console.log(error);
        setStatus(COMPOSE_STATES.ERROR);
      });
  };

  // Para cuando estemos arrastrando y soltamos adentro
  const handleDragEnter = (e) => {
    e.preventDefault();
    setDrag(DRAG_IMAGE_STATES.DRAG_OVER);
  };

  // Para cuando estamos arrastrando y salimos
  const handleDragLeave = (e) => {
    e.preventDefault();
    setDrag(DRAG_IMAGE_STATES.NONE);
  };

  // Para cuando soltamos el archivo
  const handleDrop = (e) => {
    e.preventDefault();
    setDrag(DRAG_IMAGE_STATES.NONE);
    const file = e.dataTransfer.files[0];
    console.log(e.dataTransfer.files[0]); // con esto vemos la informacion del archivo que soltamos

    // Creamos variable para la tarea
    const task = uploadImage(file);
    setTask(task);
  };

  // Para ver el estado del boton si esta desactivado o no
  const isButtonDisabled = !message.length || status === COMPOSE_STATES.LOADING;

  return (
    <>
      <Head>
        <title>Twittear</title>
      </Head>
      <div className="background">
        <section className="form_container">
          {/* SI TIENE USUARIO MOSTRAMOS EL AVATAR */}
          <form onSubmit={handleSubmit} className="form">
            <label className="label">Twittea lo que estés pensando</label>
            <textarea
              onChange={handleChange}
              onDragEnter={handleDragEnter}
              onDrop={handleDrop}
              onDragLeave={handleDragLeave}
              className="textarea"
              placeholder="¿Que esta pasando?"
              value={message}
            ></textarea>
            {/* SI HAY UNA IMAGEN PONEMOS LA IMAGEN */}
            {imgURL && (
              <section className="remove_img">
                <button onClick={() => setImgURL(null)}></button>
                <Image src={img} alt="imagen" />
              </section>
            )}
            <div className="btn_container">
              <ButtonSkyBlue disabled={isButtonDisabled} text="Twittear" />
            </div>
          </form>
        </section>
      </div>

      <style jsx>{`
        .background {
          background-color: ${colors.black};
          width: 100%;
          height: 100vh;
          display: flex;
          justify-content: center;
        }

        .form_container {
          padding: 1rem;
          background-color: ${colors.gray2};
          max-height: 400px;
          width: 500px;
          border-radius: 20px;
          margin-top: 150px;
        }

        .form {
          display: flex;
          flex-direction: column;
        }

        .label {
          margin-botton: 20px;
          font-weight: 600;
          font-size: 1.5rem;
        }

        .textarea {
          min-height: 180px;
          margin-top: 30px;
          border: ${
            drag === DRAG_IMAGE_STATES.DRAG_OVER
              ? "3px dashed #09f"
              : "3px solid transparent"
          }
          border-radius: 20px;
          padding: 0.7rem;
          background: ${colors.gray2};
          color: ${colors.white};
          font-size: 16px;
          outline: none;
          resize: none;
          width: 100%;
        }

        .textarea:focus {
          border: 1px solid ${colors.gray2};
        }

        .btn_container {
          display: flex;
          justify-content: flex-start;
          margin-top: 2rem;
        }

        /* MEDIA QUERIES */

        @media screen and (max-width: 640px) {
          .form-container {
            background: ${colors.black};
            width: 650px;
          }
        }

        @media screen and (max-width: 500px) {
          .form-container {
            background: ${colors.black};
            width: 400px;
          }
        }
      `}</style>
    </>
  );
}
