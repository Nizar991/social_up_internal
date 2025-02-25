// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey: "ENTER YOUR FIREBASE API KEY HERE",
  authDomain: "social-up-internal-mern.firebaseapp.com",
  projectId: "social-up-internal-mern",
  messagingSenderId: "980313544811",
  appId: "1:980313544811:web:f3ccbaf8ed7b41bd04392e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
export const auth = getAuth();
export const googleProvider = new GoogleAuthProvider();
