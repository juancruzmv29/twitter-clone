import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  OAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/client";

// CREAMOS EL CONTEXTO
export const UserContext = createContext();

// EL USERPROVIDER ES EL QUE LE VAMOS A UTILIZAR PARA PROVEER EL USUARIO Y LAS CREDENCIALES A LOS OTROS COMPONENTES
const UserProvider = ({ children }) => {
  // Estado para el user
  const [user, setUser] = useState(false);

  // Provider para google
  const providerGoogle = new GoogleAuthProvider();
  providerGoogle.addScope("https://www.googleapis.com/auth/contacts.readonly");

  // Provider para apple
  const providerApple = new OAuthProvider("apple.com");
  providerApple.addScope("email");
  providerApple.addScope("name");

  // Efecto para mostrar la información del usuario
  useEffect(() => {
    const unsuscribe = onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user) {
        // Extraemos todo de user
        const { email, photoURL, displayName, phoneNumber, uid } = user;
        setUser({ email, photoURL, displayName, phoneNumber, uid });
      } else {
        setUser(null);
      }
    });

    // Para terminar con el observador ejecutamos la función si hay usuario
    return () => unsuscribe();
  }, []);

  // Para registrarse
  const registerUser = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password);
  };

  // Para loguearse
  const loginUser = (email, password) => {
    signInWithEmailAndPassword(auth, email, password);
  };

  // Para entrar con cuenta de Google
  const loginGoogle = () => {
    signInWithPopup(auth, providerGoogle);
  };

  // Para entrar con cuenta de Apple
  const loginApple = () => {
    signInWithPopup(auth, providerApple);
  };

  // Para desloguearse
  const signOutUser = () => {
    signOut(auth);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        registerUser,
        loginUser,
        loginGoogle,
        loginApple,
        signOutUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
