// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";




const firebaseConfig = {
  apiKey: "AIzaSyCnhP4hxcpmRdXDn4r_kcM7E9Q_V_NeNGA",
  authDomain: "animarket-87a97.firebaseapp.com",
  projectId: "animarket-87a97",
  storageBucket: "animarket-87a97.firebasestorage.app",
  messagingSenderId: "816724908460",
  appId: "1:816724908460:web:52df431fcb1812ccd84209",
  measurementId: "G-DS6KRYX2C5"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)