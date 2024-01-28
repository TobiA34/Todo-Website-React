// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
 
const firebaseConfig = {
  apiKey: "AIzaSyDa60p1C3kAcFykgWAbtVEeLWZI7arHsAc",
  authDomain: "todo-list-aee1d.firebaseapp.com",
  projectId: "todo-list-aee1d",
  storageBucket: "todo-list-aee1d.appspot.com",
  messagingSenderId: "357551505381",
  appId: "1:357551505381:web:a33cb07b119ab1cc16b90c",
  measurementId: "G-4HJBGQ5GX9",
};
// Initialize Firebase
 const app = initializeApp(firebaseConfig);
export const db = getFirestore();