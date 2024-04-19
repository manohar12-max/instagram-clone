// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// things to get started
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  //apiKey: "AIzaSyAINU70pfdImF2Uu8-45T2MHgqYb5sPF_E",
  // authDomain: "insta-clone-d7e8d.firebaseapp.com",
  // projectId: "insta-clone-d7e8d",
  // storageBucket: "insta-clone-d7e8d.appspot.com",
  // messagingSenderId: "173435553558",
  // appId: "1:173435553558:web:c386cc24169411f868f237",
  // measurementId: "G-5BXPCYHL54"
  // apiKey: process.env.VITE_FIREBASE_API_KEY,
  // authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  // projectId:process.env. VITE_FIREBASE_PROJECT_ID,
  // storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.VITE_FIREBASE_APP_ID,
  // measurementId: process.env.VITE_FIREBASE_MEASUREMENT_ID,
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId:import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const firestore=getFirestore(app);
const storage=getStorage(app);
export { app ,auth,firestore,storage}; 
