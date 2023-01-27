// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore/lite'

// import firebase from 'firebase'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "link-in-bio-ce121.firebaseapp.com",
  projectId: "link-in-bio-ce121",
  storageBucket: "link-in-bio-ce121.appspot.com",
  messagingSenderId: "190933485466",
  appId: "1:190933485466:web:56a34b5c7c833d30ccdc23",
  measurementId: "G-XRH6TH6W61"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore()

export { auth, db, app }
