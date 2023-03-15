import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"


const firebaseConfig = {
  apiKey: "AIzaSyDYffiMIc7LlvVZJTK74d72FvA0AycgAuE",
  authDomain: "lunar-temple-362613.firebaseapp.com",
  projectId: "lunar-temple-362613",
  storageBucket: "lunar-temple-362613.appspot.com",
  messagingSenderId: "753791216141",
  appId: "1:753791216141:web:079c8855de0deb79194344",
  measurementId: "G-KQT4VV8J2S"
};

initializeApp(firebaseConfig);

export const db = getFirestore();

export const auth = getAuth();
