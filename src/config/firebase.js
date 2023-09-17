import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDbRx2_Fg-Wtq3Pnd3GswVntetmsOXv2iI",
  authDomain: "prograde-df423.firebaseapp.com",
  projectId: "prograde-df423",
  storageBucket: "prograde-df423.appspot.com",
  messagingSenderId: "973259629234",
  appId: "1:973259629234:web:c2e9371c03edbc82f0dfab",
  measurementId: "G-F0SZ0FGCWD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const storage = getStorage(app);
