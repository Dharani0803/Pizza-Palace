// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBl1bgrKz77018ZREmVXLnV1OYCklYXkqM",
  authDomain: "pizza-palace-76ebd.firebaseapp.com",
  projectId: "pizza-palace-76ebd",
  storageBucket: "pizza-palace-76ebd.firebasestorage.app",
  messagingSenderId: "507904493699",
  appId: "1:507904493699:web:8fd2ae7fae7f54c16033b6",
  measurementId: "G-J2M3HKX28E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const googleProvider =
  new GoogleAuthProvider();
