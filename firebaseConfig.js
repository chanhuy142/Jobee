import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {  initializeAuth, getReactNativePersistence } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB8B3aSaJTiMkdOCZzNUxzuZgaQ4ycR-5s",
  authDomain: "jobee-6470f.firebaseapp.com",
  projectId: "jobee-6470f",
  storageBucket: "jobee-6470f.appspot.com",
  messagingSenderId: "756142857810",
  appId: "1:756142857810:web:57410e8f8dab3cd70cc98b",
  measurementId: "G-YCXVEQX6G6"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const db = getFirestore(firebase);
const auth = initializeAuth(firebase, {
  persistence: getReactNativePersistence()
});
export {db, auth};
