// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCs_hFzPyxczyDlf33JD3epQ8abJtBNO1Q",
  authDomain: "clone-9e0de.firebaseapp.com",
  projectId: "clone-9e0de",
  storageBucket: "clone-9e0de.appspot.com",
  messagingSenderId: "1045678379723",
  appId: "1:1045678379723:web:fc9946e36b153aa7e3014e",
  measurementId: "G-L32X180ZXX",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize services
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth };
