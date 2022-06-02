import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
  Timestamp,
  orderBy,
  limit,
} from "firebase/firestore/lite";
import { useState } from "react";
import { auth, db } from "../firebase/client";

// Función para traer, hacer, editar y eliminar tweets de firestroe
export const useFirestore = () => {
  // Para la data que traemos o vams a eliminar/editar
  const [data, setData] = useState([]);
  // Para el error
  const [error, setError] = useState(false);
  // Estado para el lading
  const [loading, setLoading] = useState({});

  // Función para obtener la data
  const getData = async () => {
    console.log(auth.currentUser);
    try {
      // el prev es lo mismo que la copia que estamos haciendo abajo en setData([...data]), hago una destructuración de la data previa y le empujo lo adicional al setLoading
      setLoading((prev) => ({ ...prev, getData: true }));
      // Hacemos la referencia a la cual queremos entrar para obtener sus datos
      const dataRef = collection(db, "tweets");
      // en where le decimos el nombre q queremos filtrar
      const q = query(dataRef, where("userId", "==", auth.currentUser.uid));
      // Creamos la constante querySnapshot, invocamos a getDocs que adentro va a tener collection y a getDocs le mandamos la q, que es lo que buscamos
      const querySnapshot = await getDocs(q);
      const dataDB = querySnapshot.docs.map((doc) => doc.data());
      setData(dataDB);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading((prev) => ({ ...prev, getData: false }));
    }
  };

  // Funcion para añadir la data
  const addData = async ({ avatar, content, img, userId, userName }) => {
    try {
      setLoading((prev) => ({ ...prev, addData: true }));
      // Creamos un nuevo doc
      const newDoc = {
        avatar,
        content,
        img,
        userId,
        userName,
        createdAt: Timestamp.fromDate(new Date()), // Creamos una nueva fecha
        likesCount: 0, // contador de likes
        shareCount: 0, // contador de compatidas
      };

      // Creamos la referencia
      const docRef = doc(db, "tweets", newDoc.userId);
      // setDoc recibe la referencia y ademas recibe la data, la nueva data que seria newDoc, agregamos documento con setDoc
      setDoc(docRef, newDoc);
      // Agregamos setData. ponemos toda la data que tenemos y empujamos nuestro nuevo objeto
      setData([...data, newDoc]);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading((prev) => ({ ...prev, addData: false }));
    }
  };

  // Para eliminar la data
  const deleteData = async ({ userId }) => {
    try {
      // el prev es lo mismo que la copia que estamos haciendo abajo en setData([...data]), hago una destructuración de lo previo y le empujo lo adicional al setLoading
      setLoading((prev) => ({ ...prev, [userId]: true }));
      // docRef es la referencia, invocamos a doc que dentro va a tener la db, colección y el id
      const docRef = doc(db, "tweets", userId);
      // Eliminamos de la base de datos
      await deleteDoc(docRef);
      // Nos vamos a traer a todos los items que no coincidan con el nanoid
      setData(data.filter((tweet) => tweet.userId !== userId));
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      // Asi tengo solo un setLoading que ahora me va a servir tanto para una acción que es el addData o tambien me podria servir para el getData, updateData, deleteData etc.
      setLoading((prev) => ({ ...prev, [userId]: false }));
    }
  };

  // Para una data sola
  const searchData = async (nanoid) => {
    try {
      // Hacemos la referencia
      const docRef = doc(db, "tweets", nanoid);
      // Me devuelve el docmuento
      const docSnap = await getDoc(docRef);

      return docSnap;
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };

  // Creamos un método para subir imagenes, y lo que le va a llegar es un archivo osea un file
  const uploadImage = (file) => {
    // Recuperamos una referencia a ese storage que queremos guardar, le decimos la referencia que queremos guardar
    const ref = firebase.storage().ref(`/images/${file.name}`);
    // task seria la tarea, put va a decir que lo que te paso osea el file, lo ponga en la referencia
    const task = ref.put(file);

    return task;
  };

  return {
    data,
    error,
    loading,
    getData,
    addData,
    deleteData,
    searchData,
    uploadImage,
  };
};
