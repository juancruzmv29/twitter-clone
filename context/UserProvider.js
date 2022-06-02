import {
  onAuthStateChanged,
  OAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/client";

export const USER_STATES = {
  NOT_LOGGED: null,
  NOT_KNOWN: undefined,
};

// CREAMOS EL CONTEXTO
export const UserContext = createContext();

// EL USERPROVIDER ES EL QUE LE VAMOS A UTILIZAR PARA PROVEER EL USUARIO Y LAS CREDENCIALES A LOS OTROS COMPONENTES
const UserProvider = ({ children }) => {
  // Estado para el user
  const [user, setUser] = useState(USER_STATES.NOT_KNOWN);

  // Provider para google
  const providerGoogle = new GoogleAuthProvider();

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

  // Para entrar con cuenta de Google
  const loginGoogle = () => {
    signInWithPopup(auth, providerGoogle);
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
        loginGoogle,
        signOutUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
