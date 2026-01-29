// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";




const firebaseConfig = {
  apiKey: "AIzaSyABFr3W5XhLWNeTdT4WhgE8ar8B-DDqYB0",
  authDomain: "yustream-7c588.firebaseapp.com",
  projectId: "yustream-7c588",
  storageBucket: "yustream-7c588.firebasestorage.app",
  messagingSenderId: "304829403351",
  appId: "1:304829403351:web:0a948a12e611ec2217e092",
  measurementId: "G-G8SQTB5EBW"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)