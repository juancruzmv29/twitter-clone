// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyConf3FWfwFLrwAXXdQSHxtHt0BbbrU9WI",
  authDomain: "twitter-clone-b8350.firebaseapp.com",
  projectId: "twitter-clone-b8350",
  storageBucket: "twitter-clone-b8350.appspot.com",
  messagingSenderId: "25900939807",
  appId: "1:25900939807:web:f4a7f81f6cf0022b7bf32a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { auth, db };
